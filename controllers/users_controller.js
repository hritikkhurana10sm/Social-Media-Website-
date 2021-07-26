const User = require('../models/user');

module.exports.profile = function profile(req , res){

    return res.render('user_profile' , {

        title : "User Profile"
    });
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
}
