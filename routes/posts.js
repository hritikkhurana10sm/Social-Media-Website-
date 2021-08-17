const express = require('express');

const router = express.Router();
const passport = require('passport');
//this is basically used to separate the routes and controller

//to require it
const posts_controller = require('../controllers/posts_controller');

console.log("post controller");
router.post('/new' , passport.checkAuthentication , posts_controller.newUserPosts);
router.get('/distroy/:id' , passport.checkAuthentication , posts_controller.distroy);

module.exports = router;