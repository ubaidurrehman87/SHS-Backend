const express = require('express')
var ObjectId = require('mongodb').ObjectID
var contract = require("pdf-creator-node");
var fs = require('fs');

// Read HTML Template
// var html = fs.readFileSync('template.html', 'utf8');
var router = express.Router()

var Property = require('../models/property')
var Owner = require('../models/owner')
var Deal = require('../models/deal')

router.post('/open', async (req, res) => {

    Deal.find({ propertyId: ObjectId(req.body._id) }, async (err, prop) => {
        if (!err) {
            if ((prop.length == 0)) {

                let buyer = await Promise.resolve(
                    Owner.find({ "email": req.body.buyer }, (err, res) => {
                        if (!err) {
                            return res
                        }
                        else {
                            console.log(err)
                        }
                    })
                )

                let property = await Promise.resolve(
                    Property.find({ _id: ObjectId(req.body._id), "approveStatus" : "approved"}, (err, prop) => {
                        if (!err) {
                            return prop
                        }
                        else {
                            return err
                        }
                    })
                )

                let owner = await Promise.resolve(
                    Owner.find({ "email": await property[0].owner }, (err, owner) => {
                        if (!err) {
                            return owner
                        }
                        else {
                            return err
                        }
                    })
                )

                var deal = new Deal({
                    propertyId: ObjectId(req.body._id),
                    sellerCNIC: owner[0].cnic,
                    buyerCNIC: buyer[0].cnic,
                    buyerEmail: buyer[0].email,
                    sellerEmail: owner[0].email,
                    status: 'open',
                    message: req.body.message
                })

                deal.save((err, docs) => {
                    if (!err) {
                        res.status(200).send(docs)
                    }
                    else {
                        res.status(400).send(err)
                    }
                })

            }
            else {
                res.status(202).send({ "message": "Deal is already open!" })
            }
        }
        else {
            return err
        }
    })
})

router.get('/', (req, res) => {
    Deal.find((err, docs) => {
        if (!err) {
            res.status(200).send(docs)
        }
        else {
            res.status(400).send(err)
        }
    })
})

router.get('/:email', (req, res) => {
    Deal.find({"email" : req.params.email},(err, docs) => {
        if (!err) {
            res.status(200).send(docs)
        }
        else {
            res.status(400).send(err)
        }
    })
})
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)){
        res.status(400).send("Deal does not Exist!")
    }
    else{
        Deal.findOneAndUpdate({_id: ObjectId(req.params.id)},
         {
           $set: {
                message : req.body.DEAL.message,
                from : req.body.DEAL.from,
                to : req.body.DEAL.to,
                status : 'closed'
            }
         },
         { new: true } // return updated post
        ).exec(function(error, post) {
            if(error) {
                return res.status(400).send({msg: 'Update failed!', error : error});
            }

            res.status(200).send(post);
        });
    }
})

module.exports = router