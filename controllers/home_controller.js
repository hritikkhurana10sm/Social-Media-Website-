//this is a callback function , it will return an object so ti receive it we do .home there
const Post = require('../models/posts');
const User = require('../models/user');

//to show all the post on the home page
module.exports.home = async function home(req , res){

   try{

      //populate the user of each post
      let posts = await Post.find({})
      .sort('-createdAt')
      .populate('user')
      .populate({
          path : 'comments',
          populate:{
              path : 'user'
          }
      });
     
      //require all the users
      let users = await User.find({});

       return res.render('home' , {
          title : 'Twitter | Home',
          post : posts ,
          p_user : users
       })
  }catch(err){
     console.log("Error" , err);
     return;
  }

}


   // res.end('<h1>Hey I am in Contoller!!</h1>');
  
   //  console.log(req.cookies);
  
       //populatig the user
      //  Post.find({}).populate('user').populate({path:'comments', populate : {
      //            path:'user'
      //     }
      //  })
      //  .exec(function(err , post){

      //       if(err){
      //          console.log("error is finding the user");
      //          return;
      //       }

      //    User.find({} , function(err , users){
              
      //       res.render('home' , {
      //          'title' : "Twitter Clone",
      //           post : post,
      //           p_user : users
      //     })

      //     console.log("bla");
      //    })
            
      //  })


    



