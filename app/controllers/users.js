let User = require('../models/user.js');
let Post = require('../models/post.js');

module.exports.listaUsers = function(req, res){
    let promise = User.find().exec();
    promise.then(
        function(users){
            res.json(users)
        },
        function(erro){
            res.status(500).end();
        }
    );
}

module.exports.obterUser = function(req, res){
    let id = req.params.id;
    let promise = User.findById(id);
    promise.then(
        function(users){
            res.json(users);
        },
        function(erro){
            res.status(500).end();
        }
    );
}

module.exports.inserirUser = function(req, res){
    let promise = User.create(req.body)
    promise.then(
        function(contato){
            res.status(201).json(contato);
        },
        function(erro){
            res.status(500).json(erro);
        }
    );
}

module.exports.deletarUser = function (req, res) {
    let id = req.params.id;
    let promise = User.deleteOne({_id:id});
    promise.then(
        function(users){
            res.json(users);
        },
        function(erro){
            res.status(500).end();
        }
    );
}

module.exports.editarUser = function (req, res) {
    let id = req.params.id;
    let promise = User.findByIdAndUpdate(id, req.body);
    promise.then(
        function(users){
            res.json(users);
        },
        function(erro){
            res.status(500).end();
        }
    );
}

module.exports.mostrarPosts = function (req, res) {
    let id = req.params.id;
    let promise = Post.find({"user":id}).exec();
    promise.then(
        function(posts){
            res.json(posts);
        },
        function(erro){
            res.status(404).send("Usuário não tem posts.");
        }
    );
};
