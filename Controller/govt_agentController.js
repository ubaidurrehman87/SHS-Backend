const express = require('express');
const router = express.Router();
var {GovtAgent} = require('../models/govt_agent');
var ObjectId = require('mongodb').ObjectID;
router.get('/',(req,res)=>{
    GovtAgent.find((err,docs)=>{
        if(!err){
            res.send(docs);
        }
        else{
            console.log("Error :"+JSON.stringify(err,undefined,2));
        }
    })
});

router.post('/',(req,res)=>{
    var govagent= new GovtAgent({
        firstname : req.params.firstname,
        lastname : req.params.lastname,
        email : req.params.email,
        cnic : req.params.cnic,
        position : req.params.position,
        departmentName : req.params.departmentName,
        JobDescription : req.params.JobDescription,
    });
    govagent.save((err,docs)=>{
        if(!err){
            res.send(docs);
        }
        else{
            console.log("Error : "+JSON.stringify(err,this.undefined,2));
        }
    })
});

router.put('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Govt_Agent Does not Exist!!');
    }
    else{
        var govtAgent={
            firstname : req.params.firstname,
            lastname : req.params.lastname,
            email : req.params.email,
            cnic : req.params.cnic,
            position : req.params.position,
            departmentName : req.params.departmentName,
            JobDescription : req.params.JobDescription,
        }
        GovtAgent.findById(req.params.id,{$set:govtAgent},{new : true},(err,docs)=>{
            if(!err){
                res.send(docs);
            }
            else{
                console.log('Error : '+JSON.stringify(err,undefined,2));
            }
        });
    }
})

router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Govt_Agent Does not Exist!!');
    }
    else{
        GovtAgent.findByIdAndRemove(req.params.id,(req,res)=>{
            if(!err){
                res.send(docs);
            }
            else{
                console.log('Error : '+JSON.stringify(err,undefined,2));
            } 
        })
    }
})

module.exports = router;