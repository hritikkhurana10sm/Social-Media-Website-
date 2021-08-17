const User = require('../models/user');
const Post = require('../models/posts');

module.exports.profile = function profile(req , res){

    User.findById(req.params.id , function(err , users){

        return res.render('user_profile' , {

            title : "User Profile",
            user_profile : users
        });
    })
   
   
}

module.exports.update = function(req , res){

   if(req.params.id == req.user.id){ 
     User.findByIdAndUpdate(req.params.id , req.body , function(err , user){

           if(err){
               console.log("error in updating the users info");
               return;
           }

           return res.redirect('back');
        })
        
    }else{

            return res.redirect('back');
        }
}

module.exports.signin = function(req , res){

    
    if(req.isAuthenticated()){

        return res.redirect('/users/profile');
     }

    return res.render('user_sign_in' , {

        title : "Sign In"
    });

    
}

module.exports.signup = function(req , res){

    if(req.isAuthenticated()){

        return res.redirect('/users/profile');
     }

    return res.render('user_sign_up' , {

        title : "Sign Up"
    });
}

//get the sign up data
module.exports.create = function(req , res){

    console.log('+++++++++++++++++++++ ' , req.body);
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }   

     User.findOne({email : req.body.email} , function(err , user){
         
            if(err){
                console.log('error in finding user in the database');
                return;
            }

            if(!user){

                User.create({
                    email : req.body.email,
                    password : req.body.password,
                    name : req.body.name
                            } , function(err , user){

                    if(err){
                        console.log("error in creating user while signing up");
                        return;
                    }
                    console.log('signup' , user);
                    return res.redirect('/users/signin');
                })
            }else{
                return res.redirect('back');
            }
     });
}

//sign in and create a session
module.exports.createSession = function(req , res){

  //todo

  return res.redirect('/');
}

module.exports.destroySession= function(req , res){
    //res.clearCookie('Social');
    req.logout();

    res.redirect('/');
}

/*
Without Mongo Store, this was the problem we faced

- User was logged out after every server load
*/