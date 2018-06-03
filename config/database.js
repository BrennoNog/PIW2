let mongoose = require('mongoose');

module.exports = function (uri) {
    mongoose.connect(uri);
    mongoose.connection.on('connected', function () {
        console.log('mongoose! Conectado em ' + uri);
    });
    mongoose.connection.on('disconnected', function () {
        console.log('mongoose! Desconectado de ' + uri);
    });
    mongoose.connection.on('error', function (erro) {
        console.log('mongoose! Erro na conexão: ' + erro);
    });
    mongoose.set('debug', true);
}