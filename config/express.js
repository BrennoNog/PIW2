let express = require('express');
var usersRouter = require("../app/routes/users.js");
var postsRouter = require("../app/routes/posts.js");
let bodyParser = require('body-parser');

module.exports = function(){
    let app = express();
    app.set("port",3000);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(express.static('./public'));
    usersRouter(app);
    postsRouter(app);
    return app;
};

