const express = require('express');

const router = express.Router();
//this is basically used to separate the routes and controller

//to require it
const posts_controller = require('../controllers/posts_controller');

console.log("post controller");
router.post('/new' , posts_controller.newUserPosts);

module.exports = router;