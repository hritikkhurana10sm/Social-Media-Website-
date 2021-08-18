const Post = require('../models/posts');
const Comment = require('../models/comment');

module.exports.newUserPosts = async function (req, res) {

    try {

        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        req.flash('success' , 'Post created successfully!!');
        return res.redirect('back');

    } catch (err) {

        console.log('Error', err);
        return;
    }

}





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
            req.flash('success' , 'Post deleted successfully!!');
            return res.redirect('back');

        } else {
            res.redirect('back');
        }
     }catch(err){
        req.flash('error' ,err);
        return;
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
}