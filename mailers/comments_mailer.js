const nodeMailer = require('../config/nodemailer');

/*
 let comment = something;
 module.exports = comment
*/ 

//this is a another way of exporting a mehtod
exports.newComment = (comment) =>{

    // console.log('inside newComment mailer' , comment);

   let htmlString = nodeMailer.renderTemplate({comment : comment} , '/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({

         from : 'hritikkhurana10sm@gmail.com',
         to : comment.user.email,
         subject : "New Comment Published!!",
         html : htmlString
    } , (err , info)=>{

         if(err){
             console.log("Error in sending the mail" , err);
             return;
         }

        //  console.log("**********************************************************Message sent" , info);
         return;
    })
}