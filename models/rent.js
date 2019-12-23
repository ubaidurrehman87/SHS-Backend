const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Rent = new Schema({
    firstname : {type : String},
    lastname : {type : String},
    username : {type : String},
    email : {type : String},
    cnic : {type : Number},
});

module.exports = mongoose.model('Rent', Rent);