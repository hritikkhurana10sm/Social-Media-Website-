const express = require('express');

const router = express.Router();
const passport = require('passport');
//this is basically used to separate the routes and controller

//to require it
const comments_controller = require('../controllers/comment_controller');

//CREATING A COMMENT  (**AUTHENTICATION)
router.post('/create' , passport.checkAuthentication , comments_controller.create);

//DELETING A COMMENT   (**AUTHENTICATION)
router.get('/destroy/:id' , passport.checkAuthentication , comments_controller.destroy);

module.exports = router;