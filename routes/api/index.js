const express = require('express');

const router = express.Router();

/*
 - router index will call this index
 - this index will call v1 index
 - v1 index will use post index
 - post index will use postindex controller 
*/
router.use('/v1' , require('./v1'));

module.exports = router;