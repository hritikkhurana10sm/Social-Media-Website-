const mongoose = require('mongoose');

//comment schema
const commentSchema = new mongoose.Schema({

    //content of the comment
    content:{
        type : String,
        required:true
    },

    //commented by which user
    user :{
        type :mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    
    //commented on which post
    post:{
        type :mongoose.Schema.Types.ObjectId,
        ref:'Posts'
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
},{
    timestamps : true
});

const Comment = mongoose.model('Comment' , commentSchema);
module.exports = Comment;