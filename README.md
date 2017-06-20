# 4chan Replies Graph

Web app that visualizes 4chan threads as network graphs.

Posts are represented by nodes drawn as dots and they vary in size based on how many replies they got.

The red node is the OP (original poster) of the thread.

You can hover over nodes to see the post ID and the post's text content (no images).

Replies are represented by edges drawn as lines between two posts.

Use it in the browser:
```
https://<4chan-replies-graph server address>/<board>/thread/<thread id>
```

You can check it out [HERE](https://hidden-earth-51682.herokuapp.com)

I made this just so I could do live demos of different thread structures. All the heavy work is done on the client side, in the browser, so be patient.

Maybe I'll create a repo with Python or Processing code that does this faster, has export options, styling parameters you can change etc.
