let Post = require('../models/post.js');
let User = require('../models/user.js');
let jwt = require('jsonwebtoken');

module.exports.listaPosts = function(req, res){ //ok
    let my_posts = req.query.my_posts;
    console.log(my_posts)
    if(my_posts=="true"){
        console.log("entrei")
        let token = req.query.token;
        let user_id = jwt.decode(token).user;
 
        var promise = Post.find({user:user_id});
    }else{
        var promise = Post.find().exec();
    }
        
    
    promise.then(
        function(posts){
            res.json(posts)
        }
    ).catch(
        function(erro){
            res.status(500).end();
        }
    );
}

module.exports.obterPost = function(req, res){ //ok
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
    let token = req.query.token;
    let id = jwt.decode(token).user;
    console.log(jwt.decode(token).user);

    let post = {
        texto: req.body.texto,
        likes: req.body.likes,
        user: id
    }

    let promise = Post.create(post)
    promise.then(
        function(contato){
            res.status(201).json(contato);
        },
        function(erro){
            res.status(500).json(erro);
        }
    );
}

module.exports.deletarPost = function (req, res) { //ok
    let id = req.params.id;

    let token = req.query.token;
    let user_id = jwt.decode(token).user;

    let promise = Post.deleteOne({_id:id, user: user_id});
    promise.then(
        function(posts){
            res.json(posts);
        },
        function(erro){
            res.status(500).end();
        }
    );
}

module.exports.editarPost = function (req, res) { //how?
    let id = req.params.id;
    console.log("oi")
    let token = req.query.token;
    let user_id = jwt.decode(token).user;
    
    let post = {
        texto: req.body.texto,
        likes: req.body.likes,
    };
    let promise = Post.findOneAndUpdate({_id:id, user: user_id},{
        $set: post
    }).then((e)=>{
        res.status(201).send(post)
    }).catch(er=>{
        res.status(500).send("Erro ao atualizar");
    })
}

module.exports.mostrarUser = function (req, res) { //?
    let id = req.params.id;
    var promise = Post.find({_id:id}).populate('user').exec();
    
    promise.then(
        function(users){
            res.json(users);
        }
    ).catch(
        function(erro){
            res.status(500).send('Erro');
        }
    );
};