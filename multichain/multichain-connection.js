let multichain = require("multichain-node")({
    port: 4000,
    host: '127.0.0.1',
    user: "multichainrpc",
    pass: "12345"
});

multichain.getInfo((err, info) => {
    if(err){
        console.log(err)
    }
    console.log(info);
})