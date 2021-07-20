const express = require('express');

const router = express.Router();
//this is basically used to separate the routes and controller

//to require it
const home_controller = require('../controllers/home_controller');

//router
router.get('/' , home_controller.home);

//just confirmation statement
console.log("Hey I am in router!!");

module.exports = router;
//this is to provide its access outside the file also , we are actaully exporting its control outside the file