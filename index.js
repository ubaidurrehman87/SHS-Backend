const express= require('express');
const bodyparser= require('body-parser');
const {mongoose} =require('./db.js');
const cors =require('cors');

var propertyController=require('./Controller/propertyController');
var ownerController= require('./Controller/ownerController');
var rentController = require ('./Controller/rentController');
var sellerController = require ('./Controller/sellerController');
var govt_agentController = require('./Controller/govt_agentController');
var approvalController = require('./Controller/approvelController');

var app=express();

app.use(bodyparser.json());
app.use(cors({ origin :'http://localhost:4200'}));
app.listen(3000,()=>console.log('Server started at port : 3000'));

app.use('/property',propertyController);
app.use('/owner',ownerController);
app.use('/rent',rentController);
app.use('/seller',sellerController);
app.use('/govt_agent',govt_agentController);
app.use('/approval',approvalController);