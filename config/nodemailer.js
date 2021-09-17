// npm install nodemailer
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({

    service : 'gmail',
    host : 'smtp.gmail.com',
    post : 587, // smtp default port is 25 
    secure : false ,

    //authorisation
    auth : {
         user : 'hritikkhurana10sm@gmail.com',
         pass : 'Mummy@10'
    }
});

let renderTemplate = (data , relativePath) =>{

     let mailHTML;

     ejs.renderFile(

          path.join(__dirname , '../views/mailers' , relativePath),
          data,
          function(err , template){

            if(err){
                console.log("error in rendering the template");
                return;
            }

            mailHTML = template;
          }
     )

     return mailHTML;
}

module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}