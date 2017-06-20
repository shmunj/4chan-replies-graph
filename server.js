var request = require('request');
var express = require('express');
var cheerio = require('cheerio');
var util = require('util');

var PORT = process.env.PORT || 3000;
var app = express();
app.use(express.static('public'));
app.set('view engine', 'pug');

var server = app.listen(PORT, function() {
    util.log(`Server running at port ${PORT}`);
});

var requestOptions = { json: true };
var waitTime = 1000;
var lastCallAt = getTime();

function getTime() {
    var d = new Date();
    return d.getTime();
}

function checkThread(board, thread, callback) {
    var url = `http://a.4cdn.org/${board}/thread/${thread}.json`;
    var apidata = { posts: [] };

    request(url, requestOptions, function(err, res, data) {
        lastCallAt = getTime();

        if (err) throw err;

        if (data === undefined) {
            callback(false);
        
        } else {
            data.posts.forEach(function(post) {
                var postobj = {};
                var no = post.no;
                var replies = [];
                var com = '';

                if (post.com) {
                    com = post.com;
                    
                    var $ = cheerio.load(post.com);
                    $('.quotelink').each(function(i, ql) {
                        var href = ql.attribs.href;
                        if (href.indexOf('#p') > -1) {
                            replies.push(href.split('#p')[1]);
                        }
                    });
                }
                
                postobj.post = no;
                postobj.replies = replies;
                postobj.com = com;
                apidata.posts.push(postobj);
            });
            
            callback(apidata);
        }
    });
}

function serveThread(req, res) {
    var msg;

    if (/^\d+$/.test(req.params.thread)) {
        if (getTime() - lastCallAt < waitTime) {
            msg = 'Error: Wait a bit.';
            serveError(res, msg);
        } else {
            checkThread(req.params.board, req.params.thread, function(data) {
                if (data) {
                    res.render('graph', { 'data': data });
                } else {
                    msg = 'Error: No such thread.';
                    serveError(res, msg);
                }
            });
        }
    } else {
        msg = 'Error: Invalid thread format.';
        serveError(res, msg);
    }
}

function serveError(res, msg) {
    res.render('graph', {'error': msg});
}


app.get('/:board/thread/:thread', function(req, res) {
    serveThread(req, res);
});
