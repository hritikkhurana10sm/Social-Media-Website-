const express = require('express');

const router = express.Router();

const user_controller = require('../controllers/users_controller');

router.get('/profile' ,user_controller.profile);

router.get('/signin' , user_controller.signin );

router.get('/signup' , user_controller.signup );


module.exports = router;