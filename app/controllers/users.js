let User = require('../models/user.js');
let Post = require('../models/post.js');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

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

    let user = new User({
        nome: req.body.nome,
        email: req.body.email,
        senha: bcrypt.hashSync(req.body.senha, 10)
    });

    let promise = User.create(user)
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
    let token = req.query.token;
    let id = jwt.decode(token).user;

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
    let token = req.query.token;
    let id = jwt.decode(token).user;

    let user = {
        nome: req.body.nome,
        email: req.body.email,
        senha: bcrypt.hashSync(req.body.senha, 10)
    }

    User.findByIdAndUpdate(id, {
        $set: user
    }).then((e)=>{
        res.status(201).send(user)
    }).catch(er=>{
        res.status(500).send("Erro ao atualizar");
    })
}

module.exports.mostrarPosts = function (req, res) {
    
    let id = req.params.id;
    let promise = Post.find({user:id}).exec();
    promise.then(
        function(posts){
            res.json(posts);
        },
        function(erro){
            res.status(404).send("Usuário não tem posts.");
        }
    );
};
