const Post = require('../models/posts');
const Comment = require('../models/comment');

//CREATING A POST 
module.exports.newUserPosts = async function (req, res) {

    try {

       let post =  await Post.create({
            content: req.body.content,
            user: req.user._id // logged in  user can create post so thats why we are accessing directly here
        });

        //FOR AJAX CALLS (CHECKING WEATHER THE REQUEST WAS XhrRequest)
         if(req.xhr){
            post = await post.populate('user', 'name').execPopulate();
            console.log("post created using ajax" , post.user.name);
            return res.status(200).json({
            
                data : {
                    post : post
                },
                message : 'Post created!'
             })
         }else{
             console.log("not createdd!!");
         }
         req.flash('success' , 'Post created successfully!!');
       
        return res.redirect('back');

    } catch (err) {

        console.log('Error', err);
        return;
    }

}


//DELETING THE POST 
module.exports.distroy = async function (req, res) {


     try{
          
            let post = await Post.findById(req.params.id);
                   
          //.id converting the object id into string
        if (post.user == req.user.id) {

            post.remove(); // delete post from the data base using passport 
            //function

            //now deleting the comments under the post

            //delete the comments on post with post id given
            await Comment.deleteMany({ post: req.params.id });

            // DELETING THROUGH AJAX CALLS
            if(req.xhr){

                return res.status(200).json({

                     data : {
                         post_id : req.params.id
                     },
                     message : "Post delete successfully"
                })
            }

            req.flash('success' , 'Post deleted successfully!!');
            return res.redirect('back');

        } else {
            res.redirect('back');
        }
     }catch(err){
        req.flash('error' ,err);
        return;
     }
      
 
}









   /*Post.findById(req.params.id, function (err, post) {


        if (err) {

            console.log("error in deleting the post");
            return;
        }
        //.id converting the object id into string
        if (post.user == req.user.id) {

            post.remove(); // delete post from the data base using passport 
            //function

            //now deleting the comments under the post

            //delete the comments on post with post id given
            Comment.deleteMany({ post: req.params.id }, function (err) {

                return res.redirect('back');
            })
        } else {
            res.redirect('back');
        }
    })*/