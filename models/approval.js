const mongoose = require ('mongoose');

var Approval = mongoose.model('Approval',{
    firstname : {type:String},
    lastname : {type:String},
    email : {type : String },
    cnic : {type : String},
    location : {type : String},
    state : {type : String},
    city : {type : String},
    district : {type : String},
    postalcode : {type : Number},
    housenumber : {type: Number}
});

module.exports = {Approval};