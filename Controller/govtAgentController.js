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


// ================================= Authentication Functions ==================================
function checkUser(hash, password) {
    const match = bcrypt.compare(password, hash);
    console.log(match);
    if (match) {
        return true;
    }
    return false;
}
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




// ============================ APIs ==================================

// ==================== GET All Agents API ==========================
router.get('/', isAuthenticated, (req, res) => {
    govtAgent.find((err, docs) => {
        if (!err) {
            res.status(200).send(docs);
        }
        else {
            res.status(500).send({ "message ": "Internal Server Error" });
        }
    })
});


// ==================== SignUp API ==========================
router.post('/', (req, res) => {
    if (req.body.fname != null && req.body.lname != null && req.body.email != null && req.body.password != null && req.body.cnic != null && req.body.position != null && req.body.departmentName != null) {
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            const govtAgent = new Agent({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash,
                cnic: req.body.cnic,
                position: req.body.position,
                departmentName: req.body.departmentName,
                JobDescription: req.body.JobDescription
            });
            // checkUser(hash, req.body.password);
            govtAgent.save((err, docs) => {
                if (!err) {
                    res.send(docs);
                }
                else {
                    res.send(err);
                }
            });
        });
    }
    else {
        res.status(201).send({ "message ": "Form Fields Empty!" });
    }
});



// ========================== Login API ==============================
router.get('/login', (req, res) => {
    // console.log(atob(req.headers.authorization));
    var agentEmail = atob(req.headers.email);
    var agentPassword = atob(req.headers.password);
    if (agentEmail != null && agentPassword != null) {

        Agent.find({ 'email': agentEmail }, (err, user) => {
            if (user[0] && 'email' in user[0]) {
                if (user[0].email == agentEmail) {
                    if (bcrypt.compareSync(agentPassword, user[0].password)) {
                        let PrivateKey = fs.readFileSync(path.resolve('Controller/server.pem'), 'utf8');
                        let token = jwt.sign({ "body": "stuff" }, PrivateKey, { algorithm: 'HS256' });
                        res.status(200).json({ "token": token });
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



// ============================== Update Agent API =================================
router.put('/:id', isAuthenticated, (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).send('Agent Does not Exist!!');
    }
    else {
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {

            var govtAgent = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash
            }
            govtAgent.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, docs) => {
                if (!err) {
                    res.send(docs);
                }
                else {
                    console.log('Error :' + JSON.stringify(err, undefined, 2));
                }
            });
        });
    }
});



// =================================== DELETE Agent API =============================
router.delete('/:id', isAuthenticated, (req, res) => {
    console.log(req.params.id);
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).send('User');
    }
    else {
        User.findByIdAndRemove(req.params.id, (err, docs) => {
            if (!err) {
                res.send(docs);
            }
            else {
                console.log('Error : ' + JSON.stringify(err, undefined, 2));
            }
        });
    }
});


module.exports = router;