const express =require('express');
var ObjectId = require('mongodb').ObjectID;

var router=express.Router();

var Property = require('../models/property');

router.get('/',(req,res)=>{
    Property.find((err,docs)=>{
        if(!err){
            res.send(docs);
        }
        else{
            console.log('Error Retriving Property');
        }
    });

});

router.get('/:id',(req,res)=>{
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

router.post('/',(req,res)=>{
var prop=new Property({
    location : req.body.location,
    state : req.body.state,
    city :  req.body.city,
    district :  req.body.district,
    postalcode :  req.body.postalcode,
    house : req.body.house,
    area :  req.body.area,
    rooms :  req.body.rooms,
    floors :  req.body.floors
});

prop.save((err,docs)=>{
    if(!err){
        res.send(docs);
    }
    else{
        console.log('Error can not add Property');
    }
});

});

router.put('/:id',(err,res)=>{
    if (!ObjectId.isValid(req.params.id)){
        return res.status(400).send("Property does not Exist!")
    }
    else{
        var prop={
            location : req.body.location,
            state : req.body.state,
            city :  req.body.city,
            district :  req.body.district,
            postalcode :  req.body.postalcode,
            house : req.body.house,
            area :  req.body.area,
            rooms :  req.body.room,
            floors :  req.body.floors
        }
        Property.findById(req.params.id,{$set : prop},{new :true},(err,docs)=>{
            if (!err){
                res.send(docs);
            }
            else{
                console.log("Error in Updation :"+JSON.stringify(err,this.undefined,2));
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
