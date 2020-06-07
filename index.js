const express= require('express');
const bodyparser= require('body-parser');
const {mongoose} =require('./db.js');
const multichain = require('./multichain/multichain-connection')
const cors =require('cors');

var propertyController=require('./Controller/propertyController');
var ownerController= require('./Controller/ownerController');
var rentController = require ('./Controller/rentController');
var sellerController = require ('./Controller/sellerController');
var dealController = require('./Controller/dealsController')
var govtAgentController = require('./Controller/govtAgentController');
var approvalController = require('./Controller/approvelController');

var app=express();

app.use(bodyparser.json());
app.use(cors({ origin :'http://localhost:4200'}));
// app.use(cors({ origin :'http://localhost:2000'}));
app.listen(3000,()=>console.log('Server started at port : 3000'));

app.use('/property',propertyController);
app.use('/owner',ownerController);
app.use('/rent',rentController);
app.use('/seller',sellerController);
app.use('/deal', dealController)

app.use('/govtAgent',govtAgentController);
app.use('/approval',approvalController);

