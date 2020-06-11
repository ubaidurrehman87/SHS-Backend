const express =require('express');
var ObjectId = require('mongodb').ObjectID;

var router=express.Router();

var Property = require('../models/property');

router.get('/:id',(req,res)=>{
    console.log(req.params)
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('No Record with given id :'+req.params.id);
    }
    else{
        Property.findById(req.params.id,(err,docs)=>{
            if (!err){
                res.send(docs);
            }
            else{
                res.send("Error");
            }
        });
    }

});

router.put('/approve/:id',(req,res)=>{
    if (!ObjectId.isValid(req.params.id)){
        res.status(400).send("Property does not Exist!")
    }
    else{
        Property.findOneAndUpdate({_id: ObjectId(req.params.id)},
         {
           $set: {
                approveStatus: "approved"
            }
         },
         { new: true } // return updated post
        ).exec(function(error, post) {
            if(error) {
                return res.status(400).send({msg: 'Update failed!', error : error});
            }
            res.status(200).send(post);
        });
    }
})

router.put('/disapprove/:id',(req,res)=>{
    if (!ObjectId.isValid(req.params.id)){
        res.status(400).send("Property does not Exist!")
    }
    else{
        Property.findOneAndUpdate({_id: ObjectId(req.params.id)},
         {
           $set: {
                approveStatus: "disapproved"
            }
         },
         { new: true } // return updated post
        ).exec(function(error, post) {
            if(error) {
                return res.status(400).send({msg: 'Update failed!', error : error});
            }
            res.status(200).send(post);
        });
    }
})

router.get('/',(req,res)=>{
    Property.find((err,docs)=>{
        if(!err){
            res.send(docs);
        }
        else{
            res.send(err)
            console.log('Error Retriving Property');
        }
    });

});


router.get('/:email',(req,res)=>{
    Property.find({'owner' : req.params.email},(err,docs)=>{
        if(!err){
            res.send(docs);
        }
        else{
            console.log('Error Retriving Property');
        }
    });

});


router.post('/',(req,res)=>{
var prop=new Property({
    location : req.body.property.location,
    city :  req.body.property.city,
    type : req.body.property.type,
    district :  req.body.property.district,
    postalcode :  req.body.property.postalcode,
    house : req.body.property.houseNumber,
    area :  req.body.property.area,
    approveStatus : req.body.property.approveStatus,
    rooms :  req.body.property.rooms,
    floors :  req.body.property.floors,
    owner : req.body.property.user
});
prop.save((err,docs)=>{
    if(!err){
        res.status(200).send(docs);
    }
    else{
        console.log(err)
        res.status(500).send(err)
    }
});

});

router.put('/:id',(req,res)=>{
    if (!ObjectId.isValid(req.params.id)){
        return res.status(400).send("Property does not Exist!")
    }
    else{
        var prop={
            location : req.body.property.location,
            city :  req.body.property.city,
            type : req.body.property.type,
            district :  req.body.property.district,
            house : req.body.property.houseNumber,
            area :  req.body.property.area,
            rooms :  req.body.property.rooms,
            floors :  req.body.property.floors,
        };
        let conditions = { _id : ObjectId(req.params.id)}
        let update = {$set : prop}
        Property.findOneAndUpdate(conditions,update,{new :true},(err,docs)=>{
            if (!err){
                res.send(docs);
            }
            else{
                res.status(500).send(err)
            }
        })
    }
})

router.put('/available/:id', (req,res)=> {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send("Property does not Exist!")
    }
    else{
        let conditions = { _id : ObjectId(req.params.id)}
        let update = { $set : { availabilityStatus : req.body.availabilityStatus } }
        Property.findOneAndUpdate(conditions,update,{new : true}, (err,docs)=>{
            if(!err){
                res.status(200).send(docs)
            }
            else{
                res.status(500).send(err)
            }
        })
    }
})

router.delete('/:id',(req,res)=>{
    if (!ObjectId.isValid(req.params.id)){
        return res.status(400).send("Property Doesn't Exist with Id :"+req.params.id )
    }
    else{
        Property.findByIdAndRemove(req.params.id,(err,docs)=>{
            if(!err){
                res.send(docs);
            }
            else{
                console.log('Error :'+JSON.stringify(err, undefined ,2));
            }
        })
    }
});
module.exports=router;
