let controller = require("../controllers/posts.js");
let auth = require('../controllers/auth.js')

module.exports = function(app){
    app.get("/api/posts", controller.listaPosts);
    app.get("/api/posts/:id", controller.obterPost);
    app.post("/api/posts", controller.inserirPost);
    app.delete("/api/posts/:id", controller.deletarPost);
    app.put("/api/posts/:id", controller.editarPost);
    app.get("/api/posts/:id/user", controller.mostrarUser);
}