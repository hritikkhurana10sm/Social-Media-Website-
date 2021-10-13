const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname , '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
//if exists its ok and if not exists then make it

// const accessLogStream = rfs('access.log' , {
//     interval : '1d',
//     path:  logDirectory
// })
//write like this
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
});

const development = {
    name: 'development',
    asset_path: './assets', // to be done latter as there is influence of sass here 
    session_cookie_key: 'blahsomething',
    db: 'social_db',
    smtp: {

        service : 'gmail',
        host : 'smtp.gmail.com',
        post : 587, // smtp default port is 25 
        secure : false ,
    
        //authorisation
        auth : {
             user : 'hritikkhurana10sm@gmail.com',
             pass : 'Mummy@10'
        }
    },
    google_client_id: "939968034010-32b3r9evf3jhcginbu6d59ull87d8peb.apps.googleusercontent.com",
    google_client_secret:  "gkHZHuip86y7gVd_ERVR5w2w",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'socialClone',
    morgan :{
        mode : 'dev',
        options :{stream : accessLogStream}
    }
}

// console.log('<<<<<<<<<<<<<<<<<<<',process.env.PORT,'>>>>>>>>>>>>>>>>>>>');
const production =  {
    name: 'production',
    asset_path: './public/assets', // to be done latter as there is influence of sass here 
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,//'EeVifR29aORhjA6B1QLzrVNdGT7Y81b5', //process.env.CODEIAL_SESSION_COOKIE_KEY
    db: process.env.CODEIAL_DB,//'production_db', //process.env.CODEIAL_DB
    smtp: {

        service : 'gmail',
        host : 'smtp.gmail.com',
        post : 587, // smtp default port is 25 
        secure : false ,
    
        //authorisation
        auth : {
             user : process.env.CODEIAL_GMAIL_USERNAME,//'hritikkhurana10sm@gmail.com', //process.env.CODEIAL_GMAIL_USERNAME
             pass : process.env.CODEIAL_GMAIL_PASSWORD//'Mummy@10' //process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_client_id: process.env.GOOGLE_CLIENT_ID,//"939968034010-32b3r9evf3jhcginbu6d59ull87d8peb.apps.googleusercontent.com",//process.env.GOOGLE_CLIENT_ID
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET, //"gkHZHuip86y7gVd_ERVR5w2w",//process.env.GOOGLE_CLIENT_SECRET
    google_call_back_url: process.env.GOOGLE_CALLBACK_URL,//"http://socialclone.com/users/auth/google/callback",//process.env.GOOGLE_CALLBACK_URL
    jwt_secret: process.env.CODEIAL_JWT_SECRET,//'OfJ5cDCQTlqlmbht4iktRVJ7YouOj2cQ',//process.env.CODEIAL_JWT_SECRET
    morgan :{
        mode : 'combined',
        options :{stream : accessLogStream}
    }
}



var res =  eval(process.env.CODEIAL_ENVIRONMENT) == undefined?development : eval(process.env.CODEIAL_ENVIRONMENT);
console.log("---------------" , res);
module.exports = res;