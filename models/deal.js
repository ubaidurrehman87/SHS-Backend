const mongoose = require('mongoose')
const AutoIncrementFactory = require('mongoose-sequence');
const AutoIncrement = AutoIncrementFactory(mongoose);


var Schema = mongoose.Schema

var Deal = new Schema({
    propertyId  : { type : String},
    sellerCNIC  : { type : String},
    buyerCNIC   : { type : String},
    buyerEmail  : { type : String},
    sellerEmail : { type : String},
    message     : { type : String},
    status      : { 
        type : String,
        enum : ['open','closed', 'pending'],
        default : 'Open'
    },
    from : { type : String},
    to : { type : String}

})
// Deal.plugin(AutoIncrement, {inc_field: 'id'});

module.exports = mongoose.model('Deal', Deal);