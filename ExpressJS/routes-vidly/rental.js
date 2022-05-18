const {Rental, validate} = require('../models/rental')
const {Movie} = require('../models/movies')
const {Customer} = require('../models/customers')
const mongoose = require('mongoose')
const express= require('express')
const Fawn = require('fawn')
const router = express.Router()

Fawn.init(mongoose)
router.get('/', async(req, res)=>{
    const rentals  = await Rental.find().sort('-dateOut')
    res.send(rentals)
})

router.post('/', async(req, res)=>{
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const customer = await Customer.findById(req.body.customerId)
    if(!customer) return res.status(400).send("invalid customer")

    const movie = await Movie.findById(req.body.movieId)
    if(!movie) return res.status(400).useChunkedEncodingByDefault("invalid movie")

    if(movie.numberInStock===0) return res.status(400).send("movie not in stock")

    let rental = new Rental({
        customer:{
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone

        },
        movie:{
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    })
    // rental = await rental.save()
    // movie.numkberInStock--
    // movie.save()

    try{
        new Fawn.Task()
        .save('rentals', rental)
        .update('movies', {_id: movie._id}, {
            $inc:{numberInStock: -1}
        })
        .run()
    }
    catch(e){
        res.status(500).send('something failed')
    }
    

    res.send(rental)
})

module.exports = router