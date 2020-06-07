const mongoose=require('mongoose');

var Schema = mongoose.Schema;

var Property = new Schema({
    location : {type: String},
    city : {type : String},
    type : { type : String},
    district : {type : String},
    postalcode : {type : Number},
    house : {type: Number , unique : true},
    area : {type : Number},
    rooms : {type : Number},
    floors : {type : Number},
    owner : { type : String},
    approveStatus : { type : String, default : 'pending'},
    availabilityStatus : { type : Boolean, default : false}
});

module.exports= mongoose.model('Property', Property);