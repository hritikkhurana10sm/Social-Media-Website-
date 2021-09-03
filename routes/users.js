const express = require('express');
const router = express.Router();

const passport = require('passport');

const user_controller = require('../controllers/users_controller');


//get user profile
router.get('/profile/:id', passport.checkAuthentication ,user_controller.profile);

//update user information
router.post('/update/:id', passport.checkAuthentication ,user_controller.update);

//sign in page
router.get('/signin' , user_controller.signin );

//sign up page
router.get('/signup' , user_controller.signup );


//form related
/**********************************************/
//User Sign Up / Create User
router.post('/create' ,  user_controller.create);

//user Create session / Sign In
router.post('/create-session' , passport.authenticate(
    'local' , //type of stratergy
    {failureRedirect : '/users/signin'}
  )  , user_controller.createSession);
/**********************************************/

//user sign out 
router.get('/signout' , user_controller.destroySession);  



// these are the routes for the google-auth strategy

//18 --> creating routes here
//this will find the user in the google
router.get('/auth/google' , passport.authenticate('google' , {scope:['profile' , 'email']}));
//this is a callback that will create session
router.get('/auth/google/callback' , passport.authenticate('google',{failureRedirect : '/users/signin'}), user_controller.createSession);

module.exports = router;