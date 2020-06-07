const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var govtAgent = new Schema({
    fullName : {type:String},
    email : {type : String , unique : true},
    password : { type : String},
    cnic : {type : Number},
    position : {type : String},
    departmentName : {type : String},
    JobDescription : {type : String}
});

module.exports = mongoose.model('govtAgent', govtAgent);