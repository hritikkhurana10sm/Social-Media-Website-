/*
By default, LocalStrategy expects to find credentials in parameters 
named username and password. If your site prefers to name these fields 
differently, options are available to change the defaults.
*/ 

// npm install express-session
// npm install passport
// npm install passport-local


const passport = require('passport');

//which strategy to use to authenticate the user credentials
const localStrategy = require('passport-local').Strategy;

//require user
const User = require('../models/user');

//authentication by passport local strategy
//we need to tell passport to use local strategy
passport.use(new localStrategy({

      usernameField: 'email'  ,////email as of user input (since by default it takes name as username)
      passReqToCallback : true

},   //email , password are input from user
   function(req , email , password , done){

        //done tell weather request successful or fail

        //find a user and establish an indentity
        //first one email is that of schema
        User.findOne({email:email} , function(err , user){

            if(err){
                // console.log('error in finding the user!');
                req.flash('error' , err);
                return done(err);
            };

           //if user not found or passowrd not match
           if(!user || user.password != password){
            //console.log("Invalid username/password");
            req.flash('error', 'Invalid username/password');   
            return done(null , false);
           };
           
           //console.log('user =====>>>> ' , user);
           return done(null , user);
        });
   }   
));
                                        
//telling which key to kept in cookies -> serializing 
passport.serializeUser(function(user , done){

     done(null , user._id); // set id as cookie
});

//deserialization the user from key in the cookie
//getting the user to be used in req.user
passport.deserializeUser(function(id ,done){
    
    User.findById(id ,function(err , user){

          if(err){
               req.flash('error' , err);
              return done(err);
          }

          return done(null , user);
    } )
});

//check if user is authenticated or not
passport.checkAuthentication = function(req , res , next){

     //if user is signed in , then pass the request to profile page
     if(req.isAuthenticated()){
         return next();
     }

     //if user is not signed in
     return res.redirect('/users/signin');
}

//function to send the user info to the views
passport.setAuthenticatedUser = function(req , res , next){

    if(req.isAuthenticated()){

        //req.user contains the current signed in user from the session cookie
        //and we are just sending this to the  locals from the views

       res.locals.user = req.user; 

      // console.log('rq.user  ' , req.user);
    }

    return next();
}

//exports passport
module.exports = passport;





/*
Passport js is the most popular library used for authentication with Node.js. One of the best
parts is that it’s middleware based
- It uses session-cookies to store the identity of the authenticated user
- We can use it for multiple other authentication strategies other than local, have a look
here:
- http://www.passportjs.org/ [Go to ‘Strategies’]
- Most popular authentication strategies:
- Local
- Google
- Facebook
- Github
- JWT
- Some things we you might want to handle (it’s simple)
- Send an email on sign up
- Handle reset password
- Store the count of incorrect passwords entered and lock the account if needed
Handling Visibility of Pages/Features
- Sign in Page:
- When a user is already signed in, there is no use of showing the sign in page
again, why, because logically, sign in page is visible to logged out users.
- Sign Up Page:
- Same goes with this one
- It’s important to decide which part of the functionality of a website should be visible to
which user or people who are not even authenticated.
- Example, if someone posted a question on Quora, then someone else
would/wouldn’t be allowed to edit it is a decision we need to take as a developer.
*/ 