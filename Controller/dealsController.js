const express = require('express')
var ObjectId = require('mongodb').ObjectID
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Create a document
const contract = new PDFDocument();
const bcrypt = require('bcrypt');
const saltRounds = 10;


// Read HTML Template
// var html = fs.readFileSync('template.html', 'utf8');
var router = express.Router()

var Property = require('../models/property')
var Owner = require('../models/owner')
var Deal = require('../models/deal')

router.post('/open', async (req, res) => {
    console.log(req.body)
    Deal.find({ propertyId: ObjectId(req.body.deal._id) }, async (err, prop) => {
        if (!err) {
            if ((prop.length == 0)) {

                let buyer = await Promise.resolve(
                    Owner.find({ "email": req.body.deal.buyer }, (err, res) => {
                        if (!err) {
                            return res
                        }
                        else {
                            console.log(err)
                        }
                    })
                )

                let property = await Promise.resolve(
                    Property.find({ _id: ObjectId(req.body.deal._id), "approveStatus": "approved" }, (err, prop) => {
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
                    propertyId: ObjectId(req.body.deal._id),
                    sellerCNIC: owner[0].cnic,
                    buyerCNIC: buyer[0].cnic,
                    buyerEmail: buyer[0].email,
                    sellerEmail: owner[0].email,
                    status: 'open',
                    message: req.body.deal.message
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
                if (prop[0].status == 'closed') {
                    res.status(405).send({ "message": "Deal is Closed!" })
                } else {
                    res.status(405).send({ "message": "Deal is already open!" })
                }
            }
        }
        else {
            res.send(err)
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
    Deal.find({ "email": req.params.email }, (err, docs) => {
        if (!err) {
            res.status(200).send(docs)
        }
        else {
            res.status(400).send(err)
        }
    })
})
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).send("Deal does not Exist!")
    }
    else {
        Deal.findOneAndUpdate({ _id: ObjectId(req.params.id) },
            {
                $set: {
                    message: req.body.DEAL.message,
                    from: req.body.DEAL.from,
                    to: req.body.DEAL.to,
                    status: 'closed'
                }
            },
            { new: true } // return updated post
        ).exec(async (error, post) =>{
            if (error) {
                return res.status(400).send({ msg: 'Update failed!', error: error });
            }

                Owner.find({ "cnic": await post.sellerCNIC }, (err, owner) => {
                    if (!err) {
                        Owner.find({ "cnic": post.buyerCNIC }, (err, buyer) => {
                            if (!err) {
                                console.log(buyer)
                                bcrypt.hash(post.toString(), saltRounds, async (err, hash)=> {

                                contract.pipe(fs.createWriteStream('Smart_Contract_' + post.buyerCNIC + '.pdf'));
        
                                // contract.image('/home/akif/SHS-Backend/Controller/affidavit.jpg', {
                                //     fit: [500, 500],
                                //     align: 'center',
                                //     valign: 'center'
                                // })
                                // contract
                                // .fillColor('black')
                                // .text('I,' + owner.fullName + ' CNIC : ' + owner.cnic + ',being duly swom declare that i am the owner of this property (' + post.propertyId + ' ). I hereby, grant ' + buyer.fullName + ', CNIC : ' + buyer.cnic + ' the ownership of my property. I futher declare that all statements, answers and information submitted here are best of my knowledge and belief.', 100, 100);
                                
                                contract
                                .fontSize(16)
                                .text('I,' + owner[0].fullName + ', CNIC : ' + owner[0].cnic + ',being duly swom declare that i am the owner of this property (' + post.propertyId + ' ). I hereby, grant ' + buyer[0].fullName + ', CNIC : ' + buyer.cnic + ' the ownership of my property. I futher declare that all statements, answers and information submitted here are best of my knowledge and belief.\n\n\n <h1>Property Details :</h1> \n \n'+ post + ' \n\n' + ' Property Ownership transaction hash : \n'+ await hash , 100, 100);
                    
                                contract.end();
                                })
                            }
                            else {
                                console.log(err)
                            }
                        })
                    }
                    else {
                        return err
                    }
                })
            // )
            // let buyer = await Promise.resolve(
                
            // )
            res.status(200).send(post);
        });
    }
})

module.exports = router