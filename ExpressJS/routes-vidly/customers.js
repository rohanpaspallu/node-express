const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Joi = require('joi')
const boolean = require('joi/lib/types/boolean')
const {Customer, validate} = require('../models/customers')
//----------------------------------GET ALL ELEMENTS FROM THE DATABASE------------------------------------------------------------
router.get('/', async (req, res)=>{
    const customers = await Customer.find().sort({name:1})

    res.send(customers)
})

//----------------------------------GET A PARTICULAR ELEMENT FROM THE DATABASE------------------------------------------------------------
router.get('/:id', async (req, res)=>{
    const customer = await Customer.findById(req.params.id)

    if(!customer) return res.status(404).send("customer not found")
    res.send(customer)

})

//----------------------------------POST A PARTICULAR ELEMENT TO THE DATABASE------------------------------------------------------------
router.post('/', async (req, res)=>{

    const {error} = validate(req.body)

    if(error) return res.status(400).send(error.details[0].message)

    let customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone,
    })
    customer = await customer.save()

    res.send(customer)
})

//----------------------------------UPDATE A PARTICULAR ELEMENT IN THE DATABASE------------------------------------------------------------
router.put('/:id', async (req, res)=>{

    const {error} = validate(req.body)

    if(error) return res.status(400).send(error.details[0].message) 

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone,
    }, {new: true})

    if(!customer) return res.status(404).send("customer not found")
    res.send(customer)
})

//----------------------------------DELETE A PARTICULAR ELEMENT FROM THE DATABASE------------------------------------------------------------
router.delete('/:id', async (req, res)=>{
    const customer = await Customer.findByIdAndRemove(req.params.id)

    if(!customer) return res.status(404).send("customer not found")

    res.send(customer)
})

module.exports = router