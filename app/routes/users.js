let controller = require("../controllers/users.js");
let auth = require('../controllers/auth.js')

module.exports = function(app){
    app.post("/api/users/login", auth.logar);
    app.post("/api/users", controller.inserirUser);
    app.get("/api/users", controller.listaUsers); 
    app.get("/api/users/:id", controller.obterUser);    
    app.use("/api/users", auth.checar);
    app.delete("/api/users/", controller.deletarUser);
    app.put("/api/users/", controller.editarUser);
    app.get("/api/users/:id/posts", controller.mostrarPosts);
}