const { urlencoded } = require('express');
const express = require('express');
//calling express
const cookieParser = require('cookie-parser')
const app = express();
const port = 8000;
//while production or launching on server we use port 80 by default

//including layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

//to convert the data from form into object
app.use(urlencoded());

//to use cookie parser
app.use(cookieParser());

//extract style and scripts from subpages into the layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);

//including assets files
app.use(express.static('./assets'));

//requiring mongoose
const db = require('./config/mongoose');

//setting up the view engine
app.set('view engine' , 'ejs');
app.set('views' , './views');

//adding middleware
//before starting the server it woulg go in router
app.use('/' , require('./routes/index'));

//connecting to the port
app.listen(port , function(err){

    if(err){
        console.log("Uhh... Server Crashed!" , err);
        return;
    }
    console.log(`Server is Successfully running on Port : ${port}`);
});