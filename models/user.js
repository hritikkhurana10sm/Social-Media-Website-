const mongoose = require('mongoose');
//requiring mongoose

//adding schema
const userSchema = new mongoose.Schema({

    email : {
        type : String,
        required : true,
        unique : true
    },
    passwords : {

        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    }
}
,{
    //created at and updated at
    timestamps : true
});


const User = mongoose.model('User' , userSchema);

model.exports = User;
