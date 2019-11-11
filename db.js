const mongoose =require('mongoose');

mongoose.connect('mongodb+srv://ubaid:wuPHxXmTTNAJh4An@cluster0-rlfji.mongodb.net/test?retryWrites=true&w=majority',(err)=>{
    if (!err){
        console.log('DB connected Succfully...');
    }
    else{
        console.log('Error ');
    }
});

module.exports=mongoose;