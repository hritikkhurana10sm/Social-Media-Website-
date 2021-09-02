const express = require('express');

const router = express.Router();

const passport = require('passport');

const user_controller = require('../controllers/users_controller');

router.get('/profile/:id', passport.checkAuthentication ,user_controller.profile);

router.post('/update/:id', passport.checkAuthentication ,user_controller.update);

router.get('/signin' , user_controller.signin );

router.get('/signup' , user_controller.signup );

router.post('/create' ,  user_controller.create);



router.post('/create-session' , passport.authenticate(
    'local' , //type of stratergy
    {failureRedirect : '/users/signin'}
  )  , user_controller.createSession);

router.get('/signout' , user_controller.destroySession);  

// these are the routes for the google-auth strategy

//18 --> creating routes here
//this will find the user in the google
router.get('/auth/google' , passport.authenticate('google' , {scope:['profile' , 'email']}));
//this is a callback that will create session
router.get('/auth/google/callback' , passport.authenticate('google',{failureRedirect : '/users/signin'}), user_controller.createSession);

module.exports = router;