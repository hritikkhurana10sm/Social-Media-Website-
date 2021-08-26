const mongoose = require('mongoose');
//requiring mongoose

//multer required to upload avatars
const multer = require('multer');

const path = require('path');

//requireing path of avatars
const AVATAR_PATH = path.join('/uploads/users/avatars');

//adding schema
const userSchema = new mongoose.Schema({

    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {

        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    avatar : {
        type : String
    }
}
,{
    //created at and updated at
    timestamps : true
});

//stored in local storage
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //joining the path here
      cb(null, path.join(__dirname , '..' , AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
              //avatar name
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

//things for multer
//static <- this will remain same for all 
userSchema.statics.uploadAvatar = multer({storage : storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User' , userSchema);

module.exports = User;
