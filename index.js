const { urlencoded } = require('express');
const express = require('express'); // dependencies

/* express , cookie-parser //dependencies , mongoose , passport , passport-local , ejs , express-ejs-layout */                   

//calling express
const cookieParser = require('cookie-parser') // dependencies
const app = express();
const port = 8000;
//while production or launching on server we use port 80 by default

//requiring mongoose
const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');

//passport(authentication) , passportlocal(authentication strategy for the user) 
//, passportGoogle (authentication and strategy for google sign in)  , passportJwt (api security strategy)
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

//18  -> including the passport-google-oauth2-strategy , including under passport
// > it is used to sign in / sign up using google or any other social media platform to codial
const passportGoogle = require('./config/passport-google-oauth2-strategy');


//possport-jwt strategy
const passportJwt = require('./config/passport-jwt-strategy');

//node sass middle ware
//sass is a file used to write css with ease
const sassMiddleware = require('node-sass-middleware');

//flash messages
const flash = require('connect-flash');

const customMware = require('./config/middleware');
/*
-- Why did we use express-sessions

== To create a session cookie 
== To store the logged in user’s information in an encrypted format in the cookie 
*/


//including layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

//npm install connect-mongo
//to store cookie permanently in database once the user signed in
//as we dont want that all the users are signed out once we changed something in code at production level
//or restart the server agaain
const MongoStore =  require('connect-mongodb-session')(session);


//to convert the data from form into object
app.use(express.urlencoded());

//to use cookie parser
app.use(cookieParser());


//extract style and scripts from subpages into the layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);

//including assets files
app.use(express.static('./assets'));



//setting up the view engine
app.set('view engine' , 'ejs');
app.set('views' , './views');

app.use(session({
    name : "Social",
    //TODO change the secret befre deployment in production mode
    secret : "blahsomething",
    saveUninitialized : false,
    resave:false ,
    cookie:{
        maxAge :( 1000 * 60 * 100 )
    }//specify the number in miliseconds
     ,
     store : new MongoStore({

           mongooseConnection : db,
           autoRemove : 'disabled'
     }, function(err){

         console.log(err | "connect-mongo setup is ok");
     })
}));

app.use(passport.initialize());
app.use(passport.session());

//as soon as user is authenticated , it will pass the user
//info to the views
app.use(passport.setAuthenticatedUser);


//should be stored after session cookie onlyy
//using flash 
app.use(flash());

//requiring and using the custom middleware
app.use(customMware.setFlash);



app.use(sassMiddleware({

    src: './assets/scss',
    dest:'./assets/css',
    debug : true,
    outputStyle : 'extended',
    prefix:'/css'
}));


//adding middleware
//before starting the server it woulg go in router
app.use('/' , require('./routes/index'));
app.use('/uploads' , express.static(__dirname  + '/uploads'));
//connecting to the port
app.listen(port , function(err){

    if(err){
        console.log("Uhh... Server Crashed!" , err);
        return;
    }
    console.log(`Server is Successfully running on Port : ${port}`);
});