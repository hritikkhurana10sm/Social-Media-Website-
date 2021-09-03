const User = require('../models/user');
const Post = require('../models/posts');
const fs = require('fs');
const path = require('path')
module.exports.profile = function profile(req , res){

    User.findById(req.params.id , function(err , users){

        return res.render('user_profile' , {

            title : "User Profile",
            user_profile : users
        });
    })
   
   
}

//16 -> avatar used here using multer library
module.exports.update = async function(req , res){

    try{
    if(req.params.id == req.user.id){ 

        let user = await User.findByIdAndUpdate(req.params.id);

        //since we are using multer in form , we cant accesss req.body , thats why we use another method
        //uploadAvatar property is used to do so
        User.uploadAvatar(req , res , function(err){

              if(err){
                  console.log('***********************Multer Error' , err);
              }else{

                 user.name = req.body.name;
                 user.email = req.body.email;
                  
                //if user have uploaded the file , then go into this if
                 if(req.file){
                        
                  // var log = new File(user.avatar);
                  
                  //upload folder path
                  const paths = path.join(__dirname , '..' , user.avatar );
                  console.log("***********",paths);
                   
                  //we are checking weather file at this path exists , if yes delete it first
                  if(fs.existsSync(paths)){
                        console.log("*************user.avatar : " , user.avatar);
                        fs.unlinkSync(path.join(__dirname , '..' , user.avatar ));
                    }

                    //  if(user.avatar){

                    //     fs.unlinkSync(path.join(__dirname , '..' , user.avatar ));
                    //     user.avatar = null;
                    //  }

                    //this is saving the path of uploaded file in the avatar field in the user schema
                    user.avatar = User.avatarPath + '/' + req.file.filename;

                    // console.log('user.avatar : ' , user.avatar);
                 }
                 console.log(user);
                 
                 user.save();
              }

              return res.redirect('back');
        });

    }else{
        console.log("hat hat hat");
        res.redirect('back');
    }
}catch(err){
          
         req.flash('error' , err);
         return res.redirect('back');
    }

   
//    if(req.params.id == req.user.id){ 
//      User.findByIdAndUpdate(req.params.id , req.body , function(err , user){

//            if(err){
//                console.log("error in updating the users info");
//                return;
//            }

//            return res.redirect('back');
//         })
        
//     }else{

//             return res.redirect('back');
//         }
}

module.exports.signin = function(req , res){

    
    if(req.isAuthenticated()){

        return res.redirect('/users/profile');
     }

    return res.render('user_sign_in' , {

        title : "Sign In"
    });

    
}

module.exports.signup = function(req , res){

    if(req.isAuthenticated()){

        return res.redirect('/users/profile');
     }

    return res.render('user_sign_up' , {

        title : "Sign Up"
    });
}

//get the sign up data
module.exports.create = function(req , res){

    // console.log('+++++++++++++++++++++ ' , req.body);
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }   

     User.findOne({email : req.body.email} , function(err , user){
         
            if(err){
                console.log('error in finding user in the database');
                return;
            }

            if(!user){

                User.create({
                    email : req.body.email,
                    password : req.body.password,
                    name : req.body.name
                            } , function(err , user){

                    if(err){
                        console.log("error in creating user while signing up");
                        return;
                    }
                    console.log('signup' , user);
                    return res.redirect('/users/signin');
                })
            }else{
                return res.redirect('back');
            }
     });
}

//sign in and create a session
module.exports.createSession = function(req , res){

  //todo
   req.flash('success' , 'Logged in Successfully :)');
  return res.redirect('/');
}

module.exports.destroySession= function(req , res){
    //res.clearCookie('Social');
    req.logout();
    req.flash('success' , 'You have logged out!!');
    res.redirect('/');
}

/*
Without Mongo Store, this was the problem we faced

- User was logged out after every server load
*/