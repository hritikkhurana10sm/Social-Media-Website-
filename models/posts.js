const mongoose = require('mongoose');

//post schema containing - > 1.content of post , 2.user id who created that post , 3. ids of comments that put on this post
//so that we can show comments of a particular post easily
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
            ref : 'Comment' // refer to which schema
        }
    ]
} , {
    timestamps : true
});

//part of the post schema
const Posts = mongoose.model('Posts' , postSchema);
module.exports = Posts;