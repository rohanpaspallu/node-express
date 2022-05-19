const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Joi = require('joi')
const {Genre, validate} = require('../models/genres')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')



router.get('/',async (req, res) => {
    throw new Error('couldnt get the genres')
    const genres =  await Genre.find().sort('name')
    res.send(genres)
})

router.get('/:id', async (req, res) => {
    
    const genre = await Genre.findbyId(req.params.id)
    
    if (!genre) return res.status(404).send("genre not found")
    res.send(genre)

})

router.post('/',auth, async (req, res) => {
    // res.send(req.body.name)
    const {error} = validate(req.body)

    if(error) return res.status(400).send(error.details[0].message)

    let genre = new Genre({name: req.body.name})

    genre = await genre.save()
    res.send(genre)
})



router.put('/:id', async (req, res) => {

    const {error} = validate(req.body)

    if(error) return res.status(400).send(error.details[0].message) 

    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name},{
        new: true
    })

    if (!genre) return res.status(404).send("genre not found")

    res.send(genre)

})

router.delete('/:id',[auth, admin], async(req, res) => {

    const genre = await Genre.findByIdAndRemove(req.params.id)

    if (!genre) return res.status(404).send("genre not found")

    res.send(genre)
})



module.exports = router