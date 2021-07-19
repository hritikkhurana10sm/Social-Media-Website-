const express = require('express');
//calling express
const app = express();
const port = 8000;
//while production or launching on server we use port 80 by default

//connecting to the port
app.listen(port , function(err){

    if(err){
        console.log("Uhh... Server Crashed!");
        return;
    }
    console.log('Server is Successfully running on Port : ' , port);
});