const mongoose = require('mongoose');

// 16 -> multer required to upload avatars
const multer = require('multer');
// 16 -> requiring the path
const path = require('path');
// 16 -> requiring path of avatars
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
    // 16 - > requiring avatar in schema
    avatar : {
        type : String
    }
}
,{
    //created at and updated at
    timestamps : true
});

// 16 -> to use avatar or to upload files we use multer
/// npm install multer

//There are two functions filename and destination .These are both functions that determine where file should be stored
//Destination is used to determine within which folder the uploaded files needed to be stored

//stored in local storage
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      
        //joining the path here
      cb(null, path.join(__dirname , '..' , AVATAR_PATH));
    },
    filename: function (req, file, cb) {

        //avatar are stored using some dates
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
              //avatar name
      cb(null, file.fieldname + '-' + Date.now())
    //the default value of fieldname size is 100 bytes  
    }
  })

//things for multer
//static <- this will remain same for all 
userSchema.statics.uploadAvatar = multer({storage : storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User' , userSchema);

module.exports = User;
