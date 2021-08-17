const Post = require('../models/posts');
const Comment = require('../models/comment');

module.exports.newUserPosts = function(req , res){

    Post.create({
         content : req.body.content,
         user : req.user._id
    } , function(err , post){
     if(err){
         console.log("error in creating post for the user");
         return;
     }

     console.log('post' , post);
     return res.redirect('back');
    });
 } 

 module.exports.distroy = function(req , res){

     Post.findById(req.params.id , function(err ,post){
 

           if(err){

            console.log("error in deleting the post");
            return;
           }
        //.id converting the object id into string
           if(post.user == req.user.id){

            post.remove(); // delete post from the data base using passport 
                          //function
                
              //now deleting the comments under the post
              
              //delete the comments on post with post id given
              Comment.deleteMany({post : req.params.id} , function(err){

                return res.redirect('back');
              })
           }else{
               res.redirect('back');
           }
     })
 }