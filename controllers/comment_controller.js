const Comment = require('../models/comment');
const Post = require('../models/posts')

module.exports.create = function(req , res){

  Post.findById(req.body.post , function(err , post){

    if(post){

        Comment.create({

            content : req.body.content,
            post : req.body.post,
            user : req.user._id
        } , function(err , comment){

            if(err){

                console.log("error in creating comment");
                return;
            }
            post.comments.push(comment);
            post.save();

            res.redirect('/');
        })
    }
  })
 } 


 module.exports.destroy = function(req , res){

     //find the comment by comment id
    Comment.findById(req.params.id , function(err , comment){

         if(err){
             console.log("error in deleting the comment");
             return;
         }
 
        if(comment.user == req.user.id || p.id == req.user.id){

        //storing the id of post on which user commented
         let postId = comment.post;
         //remove the comment
         comment.remove();

         //remove the comment from the post

         Post.findByIdAndUpdate(postId , { $pull : {comments : req.params.id}} , function(err , post){

            res.redirect('back');
         })

        }else{

            res.redirect('back');
        }


    })
 }