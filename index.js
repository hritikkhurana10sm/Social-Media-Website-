const express = require('express');
//calling express
const app = express();
const port = 8000;
//while production or launching on server we use port 80 by default

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