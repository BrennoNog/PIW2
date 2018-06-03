let controller = require("../controllers/users.js");

module.exports = function(app){
    app.get("/api/users", controller.listaUsers);
    app.get("/api/users/:id", controller.obterUser);
    app.post("/api/users", controller.inserirUser);
    app.delete("/api/users/:id", controller.deletarUser);
    app.put("/api/users/:id", controller.editarUser);
    app.get("/api/users/:id/posts", controller.mostrarPosts);
}