const mongoose= require('mongoose');

var Owner=mongoose.model('Owner',{
    firstname : {type:String},
    lastname : {type:String},
    email : {type : String },
    cnic : {type : String}
});

module.exports={Owner};