var nodeset = [];
var edgeset = [];
var nodeSizes = {};
var nodes;
var edges;
var container;
var network;

window.onload = function() {
  
    posts.forEach(function(p) {
        nodeset.push({
            id: p.post,
            title: `<p>${p.post}<hr>${p.com}</p>`,
            color: function() {
                if (p == posts[0]) { return '#ff0000' }
                else return '#000000';
            }(),
            shape: 'dot',
        });

        if (p.replies.length > 0) {
            p.replies.forEach(function(r) {
                edgeset.push({
                    from: p.post, to: r
                });
                if (nodeSizes.hasOwnProperty(r)) {
                    nodeSizes[r]++;
                } else {
                    nodeSizes[r] = 1;
                }
            });
        }
    });
    
    nodeset.forEach(function(n) {
        if (nodeSizes.hasOwnProperty(n.id)) {
            n.size = nodeSizes[n.id];
        } else {
            n.size = 1;
        }
    });
    
    nodes = new vis.DataSet(nodeset);

    edges = new vis.DataSet(edgeset);

    container = document.getElementById('mynetwork');
    
    var data = {
        nodes: nodes,
        edges: edges
    };
    
    var options = {
        interaction: {
            dragNodes: false,
            selectable: false,
            hoverConnectedEdges: false,
        },
    };
    
    network = new vis.Network(container, data, options);

};
