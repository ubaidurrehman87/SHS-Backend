const express = require('express');
const router = express.Router();
var {GovtAgent} = require('../models/govt_agent');

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

    });
});


module.exports = router;