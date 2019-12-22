const mongoose= require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectID;



var Owner = new Schema({
    firstname : {type:String},
    lastname : {type:String},
    email : {type : String , unique : true},
    cnic : {type : String},
    // prop : [ { type: Schema.Types,ObjectId , ref : 'Property'} ]
});

module.exports = mongoose.model('Owner', Owner);