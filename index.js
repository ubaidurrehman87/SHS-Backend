const express= require('express');
const bodyparser= require('body-parser');
const {mongoose} =require('./db.js');
const cors =require('cors');

var propertyController=require('./Controller/propertyController');
var ownerController= require('./Controller/ownerController');

var app=express();

app.use(bodyparser.json());
app.use(cors({ origin :'http://localhost:4200'}));
app.listen(3000,()=>console.log('Server started at port : 3000'));

app.use('/property',propertyController);
app.use('/owner',ownerController);