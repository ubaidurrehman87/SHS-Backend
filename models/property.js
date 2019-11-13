const mongoose=require('mongoose');
var Schema = mongoose.Schema();
var ObjectId = require('mongodb').ObjectID;
var Property =mongoose.model('Property',{
    location : {type: String},
    state : {type : String},
    city : {type : String},
    district : {type : String},
    postalcode : {type : Number},
    house : {type: Number},
    area : {type : Number},
    rooms : {type : Number},
    floors : {type : Number},
    // owner : [{ type : Schema.Types.ObjectId, ref : 'Owner'}]
});

module.exports={Property};