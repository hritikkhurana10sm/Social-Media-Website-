const express = require('express');
const passport = require('passport');
const postsApi = require('../../../controllers/api/v1/post_api');
const router = express.Router();

//to get all posts
router.get('/' , postsApi.index);

//to delete the post
router.delete('/:id',passport.authenticate('jwt' , {session : false}), postsApi.distroy);

module.exports = router;