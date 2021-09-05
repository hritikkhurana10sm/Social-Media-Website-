const Comment = require('../models/comment');
const Post = require('../models/posts')

//including the mailer
const commentsMailer = require('../mailers/comments_mailer');

//CREATING A COMMENT
module.exports.create = async function(req , res){

   try{

    //EXTRA SECURITY - WE ARE CHECKING WEAHTER POST EXISTS OR NOT
    //ALSO WE NEED TO FIND THIS POST AS WE WANT TO INCLUDE THE COMMENT IN THE SCHEMA OF THAT POST
    let post = await Post.findById(req.body.post);

    if(post){
 
        //IF EXISTS WE CAN CREATE A COMMENT UNDER THAT POST
        let comment = await Comment.create({

            content : req.body.content,
            post : req.body.post,
            user : req.user._id // LOCAL USER CAN CREATE THE COMMENT
        });
           
       console.log("comment==========>>>>>>" , comment);
       
           //WE PUSH THE comment in the commments array OF THE POST SCHEMA
            post.comments.push(comment);

            //THEN WE NEED TO CHANGE POST SCHEMA SO WE NEED TO SAVE CHANGES DONE IN ANOTHER SCHEMA
            post.save();

            comment = await comment.populate('user').execPopulate();
            //USING COMMENT MAILER
            commentsMailer.newComment(comment);
            
            //TO DO THROUGH AJAX CALLS
            if(req.xhr){
                
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

//DESTROYING THE COMMENT
 module.exports.destroy = async function(req , res){

    try{
     //find the comment by comment id
    let comment = await Comment.findById(req.params.id );

        //ONLY WHO COMMENTED AND ON WHICH POST IT COMMENTED IT COMMENTED CAN DELETE THE POST
        if(comment.user == req.user.id || p.id == req.user.id){

         //storing the id of post on which user commented , SO AS TO REMOVE THE COMMENT FROM POST COMMENTS ARRAY ALSO
         let postId = comment.post;

         //remove the comment
         comment.remove();

         //remove the comment from the post , HERE WE REMOVE THE COMMENT FROM POST COMMENTS ARRAY
         //WE USE findByIdAndUpdate OPTION
         let post = Post.findByIdAndUpdate(postId , { $pull : {comments : req.params.id}} , function(err , post){
            
            //RETURNING AJAXLY 
            if(req.xhr){

                return res.status(200).json({

                     data : {
                         comment_id : req.params.id
                     },
                     message : "Post delete successfully"
                })
            }
           
             
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