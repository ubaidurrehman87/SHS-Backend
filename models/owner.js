const mongoose= require('mongoose');

var Schema = mongoose.Schema;

var owner = new Schema({
    fullName : {type:String},
    email : {type : String , unique : true},
    cnic : {type : String, unique : true},
    password : { type : String},
    address : { type : String},
    // prop : [ { type: Schema.Types,ObjectId , ref : 'Property'} ]
});

module.exports = mongoose.model('Owner', owner);
