const express =require('express');
var ObjectId = require('mongodb').ObjectID;
var router=express.Router();

var Rent = require ('../models/rent');

router.get('/',(req,res)=>{
    Rent.find((err,docs)=>{
        if(!err){
            res.send(docs);
        }
        else{
            console.log('Error :'+JSON.stringify(err,undefined,2));
        }
    })
});

router.get('/:id',(req,res)=>{
   if(!ObjectId.isValid(req.params.id)){
       res.status(400).send('Can not find Tenant with following Id');
   } 
   else{
       Rent.findById(req.params.id,(err,docs)=>{
           if(!err){
               res.send(docs);
           }
           else{
               console.log('Error : '+JSON.stringify(err,undefined,2));
           }
       })
   }
})

router.post('/',(req,res)=>{
    var rent=new Rent({
        firstname : req.params.firstname,
        lastname : req.params.lastname,
        username : req.params.username,
        email : req.params.email,
        cnic : req.params.cnic,
    })
    rent.save((err,docs)=>{
        if(!err){
            res.send(docs);
        }
        else{
            console.log('Error : '+JSON.stringify(err,undefined,2));
        }
    });


})

router.put('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Tenant Does not Exist with ID ');
    }
    else{
        var rent={
            firstname : req.params.firstname,
            lastname : req.params.lastname,
            username : req.params.username,
            email : req.params.email,
            cnic : req.params.cnic,
        }
        Rent.findById(req.params.id,{$set:rent},{new : true},(err,docs)=>{
            if(!err){
                res.send(docs);
            }
            else{
                console.log('Error : '+JSON.stringify(err,undefined,2));
            }
        });
    }
});

router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Tenant Does not Exist with ID ');
    }
    else{
        Rent.findByIdAndRemove(req.params.id,(err,docs)=>{
            if(!err){
                res.send(docs);
            }
            else{
                console.log('Error : '+JSON.stringify(err,undefined,2));
            }
        })
    }
});


module.exports= router;