const mongoose = require('mongoose');

var Schema =mongoose.Schema();
var ObjectId = require('mongodb').ObjectID;

var Seller= mongoose.model('Seller',{
    firstname : {type : String},
    lastname : {type : String},
    username : {type : String},
    email : {type : String},
    cnic : {type : Number},
    // prop : [{type : Schema.Types.ObjectId , ref : 'Property'}]
});

module.exports={Seller};
