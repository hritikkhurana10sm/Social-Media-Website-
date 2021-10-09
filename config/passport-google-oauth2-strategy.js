//18 -> install passport-google-oauth

const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

//random password generator ->> npm install crypto
//when the user have google account but not have account on codial then it will be given with any random password 
const crypto = require('crypto');

const User = require('../models/user');
const env = require('./environment');
passport.use(new googleStrategy({

    //before doing this step , we need to go to google cloud
    //there we need to take google permission first to access the google sign in feature
    //we will register our project first and then all steps are one after one
    clientID : env.google_client_id,
    clientSecret : env.google_client_secret,
    callbackURL : env.google_call_back_url 
},


function(accessToken , refreshToken , profile , done){

    //if user found in google
    User.findOne({email:profile.emails[0].value}).exec(function(err , user){

        if(err){
            console.log("error in google strategy-passport" , err);
            return;
        }

        console.log(profile);
       
        //user found in google and already that can be access in req.user
        if(user){
               return done(null , user);
        }else{
         
            //create then able to access req.user
             User.create({
                 name : profile.displayName,
                 email : profile.emails[0].value,
                 password : crypto.randomBytes(20).toString('hex')
             } , function(err , user){

                if(err){
                    console.log("error in created user in google strategy-passport" , err);
                    return;
                }

                return done(null , user);
             })
        }
        
    })

})

)