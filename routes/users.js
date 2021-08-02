const express = require('express');

const router = express.Router();

const passport = require('passport');

const user_controller = require('../controllers/users_controller');

router.get('/profile', passport.checkAuthentication ,user_controller.profile);

router.get('/signin' , user_controller.signin );

router.get('/signup' , user_controller.signup );

router.post('/create' ,  user_controller.create);

router.post('/create-session' , passport.authenticate(
    'local' , //type of stratergy
    {failureRedirect : '/users/signin'}
  )  , user_controller.createSession);

router.get('/signout' , user_controller.destroySession);  
module.exports = router;