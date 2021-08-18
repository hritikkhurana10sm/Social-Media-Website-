const Comment = require('../models/comment');
const Post = require('../models/posts')

module.exports.create = async function(req , res){

   try{

    let post = await Post.findById(req.body.post);

    if(post){

        let comment = await Comment.create({

            content : req.body.content,
            post : req.body.post,
            user : req.user._id
        });

            post.comments.push(comment);
            post.save();
            req.flash('success' , 'Commented successfully!!');
            res.redirect('/');
        }

   }catch(err){
      // console.log('Error' , err);
       req.flash('error' , err); 
      return;
   }

  
 } 


 module.exports.destroy = async function(req , res){

    try{
     //find the comment by comment id
    let comment = await Comment.findById(req.params.id );

        
        if(comment.user == req.user.id || p.id == req.user.id){

        //storing the id of post on which user commented
         let postId = comment.post;
         //remove the comment
         comment.remove();

         //remove the comment from the post

         let post = Post.findByIdAndUpdate(postId , { $pull : {comments : req.params.id}} , function(err , post){
            
            req.flash('success' , 'Comment deleted successfully!!');
            res.redirect('back');
         })

        }else{
            req.flash('error' , 'Comment cant be deleted :(');
            res.redirect('back');
        }


    }catch(err){
        req.flash('error' , err);
            return;
    }
 }