const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Seller= new Schema({
    firstname : {type : String},
    lastname : {type : String},
    username : {type : String},
    email : {type : String},
    cnic : {type : Number},
    // prop : [{type : Schema.Types.ObjectId , ref : 'Property'}]
});

module.exports = mongoose.model('Seller', Seller);
