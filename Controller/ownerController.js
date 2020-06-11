const express = require('express');
const router = express.Router();
var Agent = require('../models/govt_agent');
var path = require('path')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
var ObjectId = require('mongoose').Types.ObjectId;
const saltRounds = 10;
var atob = require('atob');

var Owner= require('../models/owner');

router.get('/',(req,res)=>{
    Owner.find((err,docs)=>{
        if(!err){
            res.status(200).send(docs);
        }
        else{
            res.status(404).send(err);
        }
    })
});


function isAuthenticated(req, res, next) {
    if (typeof req.headers.token !== "undefined") {
        let token = req.headers.token;

        let PrivateKey = fs.readFileSync(path.resolve('Controller/server.pem'), 'utf8');
        // console.log(PrivateKey);
        jwt.verify(token, PrivateKey, { algorithm: 'HS256' }, (err, decoded) => {
            if (err) {
                res.status(500).json({ "error": "NOT AUTHORIZED" });
            }
            // console.log(decoded);
            return next();
        })
    } else {
        res.status(500).json({ "error": "NOT AUTHORIZED" });
    }
}


// ========================== Sign Up API ==============================

router.post('/register',(req,res)=>{
    bcrypt.hash(req.body.Owner.password, saltRounds, function (err, hash) {
        var owner=new Owner({
            password : hash,
            fullName : req.body.Owner.fullName,
            email : req.body.Owner.email,
            cnic : req.body.Owner.cnic,
            address : req.body.Owner.address,
        });
        // checkUser(hash, req.body.password);
        owner.save((err, docs) => {
            if (!err) {
                res.status(200).send(docs)
            }
            else {
                console.log(err);
                res.status(500).send(err);
            }
        });
    });
    
});


// ========================== Login API ==============================
router.post('/login', (req, res) => {
    // console.log(atob(req.headers.authorization));
    var ownerEmail = req.body.credentials.email;
    var ownerPassword = req.body.credentials.password;
    if (ownerEmail != null && ownerPassword != null) {

        Owner.find({ 'email': ownerEmail }, (err, user) => {
            if (user[0] && 'email' in user[0]) {
                if (user[0].email == ownerEmail) {
                    if (bcrypt.compareSync(ownerPassword, user[0].password)) {
                        let PrivateKey = fs.readFileSync(path.resolve('Controller/server.pem'), 'utf8');
                        let token = jwt.sign({ "body": "stuff" }, PrivateKey, { algorithm: 'HS256' });
                        res.status(200).json({ "token": token , user : ownerEmail, name : user[0].fullName});
                    }
                    else {
                        res.status(201).send({ "message": "Email or Password is incorrect" });
                    }
                    if (err) {
                        res.status(201).send({ "message": "Email or Password is incorrect" });
                    }
                }
            } else {
                res.send({ "message": "NOT Registered" });
            }
        });
    }
    else {
        res.status(400).json({ "error": "Form Fields Empty" });
    }

});


router.put('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.body.id)){
        res.status(400).send('Owner Does not Exist!!');
    }
    else{
        var owner={
            fullName : req.body.fullName,
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

router.get('/:email', (req,res)=>{
    Owner.find({'email' : req.params.email}, (err, user)=> {
        if (user[0] && 'email' in user[0]) {
            if (user[0].email == req.params.email) {
                res.status(200).send({ "status" : true})
            }
        }
        else{
            res.status(404).send({status : false})
        }
        if(err){
            console.log(err)
        }
    })
})

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