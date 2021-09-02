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
           
       console.log("comment******************** " , comment);
       

            post.comments.push(comment);
            post.save();

            if(req.xhr){
                  comment = await comment.populate('user').execPopulate();
                // comment = await comment.populate('user', 'avatar').execPopulate();
                 // comment  = await  comment.populate('post').execPopulate();
                  //console.log("post created using ajax" , post.user.name);
                  console.log("comment created by ajax  " , comment);
                     return res.status(200).json({
                     
                         data : {
                             comment : comment
                         },
                         message : 'Comment created!'
                      })
                  }
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
            // 
            if(req.xhr){

                return res.status(200).json({

                     data : {
                         comment_id : req.params.id
                     },
                     message : "Post delete successfully"
                })
            }
            // 
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