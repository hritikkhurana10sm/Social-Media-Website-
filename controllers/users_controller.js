const User = require('../models/user');

module.exports.profile = function profile(req , res){

     //if we dont have cookie in application then we need to go redirect back to sign in page
 
       if(req.cookies.user_id){
         
        User.findById(req.cookies.user_id , function(err , user){

            if(err){

                console.log("error in finding user for profie!!");
                return;
            }
                 
            return res.render('user_profile' , {
                title : "Profile of User",
                name : user.name,
                email : user.email
            })

        })
        // return res.render('user_profile' , {

        //     title : "User Profile"
        // });
       }else{
           return res.redirect('/users/signin');
       }
    //if we find cookie on application we can visit direclty to sign page , continue....
   
}

module.exports.signin = function(req , res){

    return res.render('user_sign_in' , {

        title : "Sign In"
    });
}

module.exports.signup = function(req , res){

    return res.render('user_sign_up' , {

        title : "Sign Up"
    });
}

//get the sign up data
module.exports.create = function(req , res){


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

   User.findOne({email:req.body.email},function(err , user){

         if(err){
             console.log('error in finding user in siging in');
             return;
         }
  
         //handle user found

         if(user){

               if(user.password != req.body.password){
                   console.log("password does not match");
                   return res.redirect('back');
               }

               //handle session creation
               res.cookie('user_id' , user._id);

               return res.redirect('/users/profile');
         }else{
             return res.redirect('back');
         }
   });
}


//sign out controllers

module.exports.signout = function(req , res){

    
    res.clearCookie("user_id");

   res.redirect('/users/signin');
}