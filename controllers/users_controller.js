module.exports.profile = function profile(req , res){

    return res.render('user_profile' , {

        title : "User Profile"
    });
}

module.exports.signin = function(req , res){

    return res.render('user_sign_in' , {

        title : "Sign In"
    });
}

module.exports.signup = function(req , res){

    return res.render('user_sign_up' , {

        title : "Sign Up"
    });
}

//get the sign up data
module.exports.create = function(req , res){

     //todo   
}

//sign in and create a session
module.exports.createSession = function(req , res){

  //todo
}
