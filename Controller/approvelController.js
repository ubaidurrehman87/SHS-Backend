const express = require('express');
const ObjectId = require('mongodb').ObjectID;

var router = express.Router();


const {Approval} = require('../models/approval');

router.get('/',(req,res)=>{
    Approval.find((err,docs)=>{
        if (!err){
            res.send(docs);
        }
        else{
            console.log('Error' , JSON.stringify(err,undefined,2));
        }   
    });

});

router.post('/',(req,res)=>{
    var approval = new Approval({
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email,
        cnic : req.body.cnic,
        location : req.body.location,
        state : req.body.state,
        city : req.body.city,
        district : req.body.district,
        postalcode : req.body.postalcode,
        housenumber : req.body.housenumber
    });
    approval.save((err,docs)=>{
        if(!err){
            res.send(docs);
        }   
        else{
            console.log('Error',JSON.stringify(err,undefined,2));
        }
    });
});

router.put('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.body.id)){
        res.status(400).send('Approval Dose not Exist!!');
    }
    else{
        var approval = {
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email : req.body.email,
            cnic : req.body.cnic,
            location : req.body.location,
            state : req.body.state,
            city : req.body.city,
            district : req.body.district,
            postalcode : req.body.postalcode,
            housenumber : req.body.housenumber
        };
        Approval.findById(req.body.id , {$set : approval},{new : true},(err,docs)=>{
            if(!err){
                req.send(docs);
            }
            else{
                console.log('Error',JSON.stringify(err,undefined,2));
            }
        });
    }
});

router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Approval Not Found');
    }
    else{
       Approval.findByIdAndRemove(req.params.id,(err,docs)=>{
           if(!err){
                res.send(docs);
           }
           else{
            console.log('Error',JSON.stringify(err,undefined,2));
           }
       })
    }
});

module.exports = router;