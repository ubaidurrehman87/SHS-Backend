const mongoose = require('mongoose');

var GovtAgent = mongoose.model('GovtAgent',{
    firstname : {type:String},
    lastname : {type:String},
    email : {type : String , unique : true},
    cnic : {type : Number},
    position : {type : String},
    departmentName : {type : String},
    JobDescription : {type : String},


});

module.exports = {GovtAgent}