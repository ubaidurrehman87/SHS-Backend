const mongoose=require('mongoose');

var Schema = mongoose.Schema;

var Property = new Schema({
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

module.exports= mongoose.model('Property', Property);