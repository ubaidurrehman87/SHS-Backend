const mongoose =require('mongoose');

mongoose.connect('mongodb://localhost:27017/SmartContract',(err)=>{
    if (!err){
        console.log('DB connected Succfully...');
    }
    else{
        console.log('Error ');
    }
});

module.exports=mongoose;