var mongoose = require('mongoose');
module.exports = function(){
    var schema = mongoose.Schema({
        texto:{
            type:String,
            required: true
        },
        likes:{
            type:String,
            required: true
        },
        user:{
            type:mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        }
    });
    return mongoose.model('post',schema);
}();
