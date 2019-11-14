const express = require('express')
var ObjectId = require('mongodb').ObjectID;

var router=express.Router();

var {Owner}= require('../models/Owner');

router.get('/',(req,res)=>{
    Owner.find((err,docs)=>{
        if(!err){
            res.send(docs);
        }
        else{
            console.log('Error'+JSON.stringify(err,undefined,2));
        }
    })
});

router.post('/',(req,res)=>{
    var owner=new Owner({
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email,
        cnic : req.body.cnic
    });
    owner.save((err,docs)=>{
        if (!err){
            res.send(docs);
        }
        else{
            console.log('Error : '+JSON.stringify(err,undefined,2));
        }
    });
    
});

router.put('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.body.id)){
        res.status(400).send('Owner Dose not Exist!!');
    }
    else{
        var owner={
            firstname : req.body.name,
            lastname : req.body.lastname,
            email : req.body.email,
            cnic : req.body.cnic
        }
        Owner.findById(req.body.id,{$set:owner},{new : true},(err,docs)=>{
          if(!err){
                res.send(docs);
          }
          else{
            console.log('Error :' +JSON.stringify(err,undefined,2));
          }
        });
    }
});

router.delete('/:id',(req,res)=>{
    if (!ObjectId.isValid(req.body.id)){
        res.status(400).send('Owner Does not Exist!!');
    }
    else{
        Owner.finByIdAndRemove(req.body.id,(err,docs)=>{
            if(!err){
                res.send(docs);
            }
            else{
                console.log('Error : '+JSON.stringify(err,undefined,2));
            }
        });
    }
});

module.exports=router;