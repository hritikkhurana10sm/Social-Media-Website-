//user api to create session and it will return the jwt token

const User = require('../../../models/user');

//on session creation , return the jsonwebtoken and yes include it!
//to delete any post we included jwt security
//first we need to get jwt token by creating session
//then we can delete the authorised posts
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req , res){

    try{

        let user = await User.findOne({email : req.body.email});

        if(!user || user.password != req.body.password){

            return res.json(422 , {
                message : "Invalid username or password"
            });
        }

        //on session creating return the token so as to provide authorisation to the user
        return res.json(200 , {
            message : 'Sign in successfully , here is you token , keep it safe , shhhh',
            data : {
                token : jwt.sign(user.toJSON() , 'socialClone' , {expiresIn : '100000'})
            }
        });
        
    }catch(err){
        console.log('*******' , err);
        return res.json(500 , {
            message : 'Internal Server xxError'
        });
    }
}