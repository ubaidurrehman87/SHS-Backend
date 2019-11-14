const mongoose= require('mongoose');

var Schema = mongoose.Schema();
var ObjectId = require('mongodb').ObjectID;


var Owner=mongoose.model('Owner',{
    firstname : {type:String},
    lastname : {type:String},
    email : {type : String , unique : true},
    cnic : {type : String},
    // prop : [ { type: Schema.Types,ObjectId , ref : 'Property'} ]
});

module.exports={Owner};