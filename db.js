const mongoose =require('mongoose');

mongoose.connect('mongodb+srv://ubaid:wuPHxXmTTNAJh4An@cluster0-rlfji.mongodb.net/SmartContract?retryWrites=true&w=majority',(err)=>{
    if (!err){  
        console.log('DB connected Successfully...');
    }
    else{
        console.log('Error ');
    }
});

module.exports=mongoose;