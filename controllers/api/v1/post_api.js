/* Post api to show and delete the posts */ 

//including the Post and Comment Schema
const Post =  require('../../../models/posts');
const Comment = require('../../../models/comment')

//to return all the posts
module.exports.index = async function(req ,res){
     
    let posts = await Post.find({})
    .sort('-createdAt')
     .populate('user')
     .populate({
        path : 'comments',
        populate:{
            path : 'user'
        }
     });

      //in case of api return json object
     return res.json(200 , {
         message : "List of posts",
         posts : posts
     })
}

//to distroy the posts
module.exports.distroy = async function (req, res) {


    try{
         
           let post = await Post.findById(req.params.id);
         
         if(post.user == req.user.id){  
          //remove the posts
            post.remove(); 

           //remove the associated comments with deleted post id
           await Comment.deleteMany({ post: req.params.id });

           //return json object
           return res.json(200 , {
               message : "post and its commembts are deleted successfuly"
           });
        }else{
            return res.json(401 , {
                message : "You cannot delete this post!"
            });
        }
       
    }catch(err){
      console.log(err);
       return res.json(500 , {
           message : 'internal server error '
       });
    }
     
  
}