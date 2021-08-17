//this is a callback function , it will return an object so ti receive it we do .home there
const Post = require('../models/posts');
const User = require('../models/user');
module.exports.home = function home(req , res){

   // res.end('<h1>Hey I am in Contoller!!</h1>');
  
    console.log(req.cookies);
  
       //populatig the user
       Post.find({}).populate('user').populate({path:'comments', populate : {
                 path:'user'
          }
       })
       .exec(function(err , post){

            if(err){
               console.log("error is finding the user");
               return;
            }

         User.find({} , function(err , users){
              
            res.render('home' , {
               'title' : "Social Clone",
                post : post,
                p_user : users
          })
          
         })
            
       })
    
}

