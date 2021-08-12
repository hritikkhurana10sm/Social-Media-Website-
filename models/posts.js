const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    content : {
        type : String,
        required : true
    },
    user:{
       type : mongoose.Schema.Types.ObjectId,
       ref : 'User' // refer to which schema
    },

    //include the array of ids of all the comments in this post
    comments:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
        }
    ]
} , {
    timestamps : true
});

const Posts = mongoose.model('Posts' , postSchema);

module.exports = Posts;