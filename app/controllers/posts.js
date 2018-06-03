let Post = require('../models/post.js');
let User = require('../models/user.js');

module.exports.listaPosts = function(req, res){
    let promise = Post.find().exec();
    promise.then(
        function(posts){
            res.json(posts)
        },
        function(erro){
            res.status(500).end();
        }
    );
}

module.exports.obterPost = function(req, res){
    let id = req.params.id;
    let promise = Post.findById(id);
    promise.then(
        function(posts){
            res.json(posts);
        },
        function(erro){
            res.status(500).end();
        }
    );
}

module.exports.inserirPost = function(req, res){
    let promise = Post.create(req.body)
    promise.then(
        function(contato){
            res.status(201).json(contato);
        },
        function(erro){
            res.status(500).json(erro);
        }
    );
}

module.exports.deletarPost = function (req, res) {
    let id = req.params.id;
    let promise = Post.deleteOne({_id:id});
    promise.then(
        function(posts){
            res.json(posts);
        },
        function(erro){
            res.status(500).end();
        }
    );
}

module.exports.editarPost = function (req, res) {
    let id = req.params.id;
    let promise = Post.findByIdAndUpdate(id, req.body);
    promise.then(
        function(posts){
            res.json(posts);
        },
        function(erro){
            res.status(500).end();
        }
    );
}

module.exports.mostrarUser = function (req, res) {
    let id = req.params.id;
    let promise = Post.findById(id).populate('user','-senha').exec();
    promise.then(
        function(posts){
            res.json(posts);
        },
        function(erro){
            res.status(404).send("Usuário não tem posts.");
        }
    );
};