const { urlencoded } = require('express'); // done
const env = require('./config/environment');//:::::::::::::::::::::::::::::::::::::::
// npm install express
const express = require('express'); // done

const logger = require('morgan');

/* express , cookie-parser //dependencies , mongoose , passport , passport-local , ejs , express-ejs-layout */                   

// calling express
// npm install cookie-parser
const cookieParser = require('cookie-parser') // done

const app = express(); // done
const port = 8000;  // done
// while production or launching on server we use port 80 by default

// requiring mongoose
// npm install mongoose
const db = require('./config/mongoose'); // done

// used for session cookie <-- this is required for using PASSPORT.JS so as to STORE COOKIE AND MAKE SESSION
// npm install express-session
const session = require('express-session'); // done
/*
-- Why did we use express-sessions
== To create a session cookie 
== To store the logged in user’s information in an encrypted format in the cookie 
*/

/* passport(authentication) , passportlocal(authentication strategy for the user) 
,  passportGoogle (authentication and strategy for google sign in)  , passportJwt (api security strategy)*/
const passport = require('passport'); // done
//including initialisation and session

const passportLocal = require('./config/passport-local-strategy');//done

// 18  -> including the passport-google-oauth2-strategy , including under passport
// > it is used to sign in / sign up using google or any other social media platform to codial
const passportGoogle = require('./config/passport-google-oauth2-strategy'); // done


// possport-jwt strategy
const passportJwt = require('./config/passport-jwt-strategy'); //done

// node sass middle ware
// sass is a file used to write css with ease
// npm install node-sass-middleware
// we need to app.use also
const sassMiddleware = require('node-sass-middleware'); // done

// flash messages
// npm install connect-flash
// connect-flash needs express-session and cookie-parser
// and there are steps here
const flash = require('connect-flash'); // (1)

const customMware = require('./config/middleware'); // (2)



// including layouts
// npm install express-ejs-layouts
const expressLayouts = require('express-ejs-layouts'); //done
app.use(expressLayouts);//done

// npm install connect-mongo but now used as connect-mongodb-session***
// to store cookie permanently in database once the user signed in
// as we dont want that all the users are signed out once we changed something in code at production level
// or restart the server agaain
const MongoStore =  require('connect-mongodb-session')(session); //done


//to convert the data from form into object / use req.body.something
app.use(express.urlencoded()); // done

//to use cookie parser
//manually setting the cookie in browser
app.use(cookieParser()); // done


//extract style and scripts from subpages into the layout
app.set('layout extractStyles' , true); //done
app.set('layout extractScripts' , true); //done

// including assets files
//::::::::::::::::::::::::::::::::::::::::
//app.use(express.static(env.asset_path));
app.use(express.static('./assets')); // done


// npm install ejs
// setting up the view engine
app.set('view engine' , 'ejs');
app.set('views' , './views');

app.use(session({  // const MongoStore =  require('connect-mongodb-session')(session);

    name : "Social",

    //TODO change the secret before deployment in production mode
    secret : env.session_cookie_key,
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

//initialisation and session
app.use(passport.initialize());
app.use(passport.session());

//as soon as user is authenticated , it will pass the user info to the views
app.use(passport.setAuthenticatedUser);


// should be stored after session cookie only ( using flash ) 
app.use(flash()); // (3)

// requiring and using the custom middleware
app.use(customMware.setFlash); // (4)

const cors = require('cors');
app.use(cors());



// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');


if(env.name == 'development'){
// using SASS MIDDLEWARE // (5)
app.use(sassMiddleware({
    //:::::::::::::::::::::::::::::::::::::::::::::::::
   // src: path.join(__dirname, env.asset_path, 'scss'),
   // dest: path.join(__dirname, env.asset_path, 'css'),
    src: './assets/scss',
    dest:'./assets/css',
    debug : true,
    outputStyle : 'extended',
    prefix:'/css'
}));  // done
// (6) Usage in layouts
}



// adding middleware
// before starting the server it would go in router
app.use('/' , require('./routes/index')); // done

//upload files -> avatar
app.use('/uploads' , express.static(__dirname  + '/uploads')); //done

app.use(logger(env.morgan.mode , env.morgan.options));

//connecting to the port
app.listen(port , function(err){

    if(err){
        console.log("Uhh... Server Crashed!" , err);
        return;
    }
    console.log(`Server is Successfully running on Port : ${port}`);
});