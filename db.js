const mongoose =require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://ubaid:wuPHxXmTTNAJh4An@cluster0-rlfji.mongodb.net/SmartContract?retryWrites=true&w=majority', { useNewUrlParser : true, useUnifiedTopology : true } ,(err)=>{
    if (!err){  
        console.log('DB connected Successfully...');
    }
    else{
        console.log('Error ');
    }
});

module.exports = mongoose;