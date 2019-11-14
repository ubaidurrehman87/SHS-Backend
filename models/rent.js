const mongoose = require('mongoose');

var Rent = mongoose.model('Rent',{
    firstname : {type : String},
    lastname : {type : String},
    username : {type : String},
    email : {type : String},
    cnic : {type : Number},
});

module.exports = {Rent};