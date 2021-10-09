//here in this we are connecting the node and mongoBD using a layer called mangoose 

//Mongoose queries are asynchronous as it contains a callback and also exceute other statements


//include mongobd
const mongoose = require('mongoose');
const env = require('./environment');
//mongoose connect to data base : mongobd
mongoose.connect(`mongodb://localhost/${env.db}`);

//to check weather connected or not
const db = mongoose.connection

//on error 
db.on('error', console.error.bind(console, 'connection error:'));

//once connected 
db.once('open', function() {
  console.log("connected to mongoDB finally!!");
});
