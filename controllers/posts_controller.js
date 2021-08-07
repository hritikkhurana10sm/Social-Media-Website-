const Post = require('../models/posts');


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
    })
 } 