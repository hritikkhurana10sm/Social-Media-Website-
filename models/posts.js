const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    content : {
        type : String,
        required : true
    },
    user:{
       type : mongoose.Schema.Types.ObjectId,
       ref : 'user' // refer to which schema
    }
} , {
    timestamps : true
});

const Posts = mongoose.model('Posts' , postSchema);

module.exports = Posts;