const express = require ('express');
var {Seller} = require ('../models/seller');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

router.get('/',(req,res)=>{
    Seller.find((err,docs)=>{
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
       Seller.findById(req.params.id,(err,docs)=>{
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
    var seller=new Seller({
        firstname : req.params.firstname,
        lastname : req.params.lastname,
        username : req.params.username,
        email : req.params.email,
        cnic : req.params.cnic,
    })
    seller.save((err,docs)=>{
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
        var seller={
            firstname : req.params.firstname,
            lastname : req.params.lastname,
            username : req.params.username,
            email : req.params.email,
            cnic : req.params.cnic,
        }
        Seller.findById(req.params.id,{$set:seller},{new : true},(err,docs)=>{
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
        Seller.findByIdAndRemove(req.params.id,(err,docs)=>{
            if(!err){
                res.send(docs);
            }
            else{
                console.log('Error : '+JSON.stringify(err,undefined,2));
            }
        })
    }
});


module.exports=router;