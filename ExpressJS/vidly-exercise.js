const Joi = require('joi')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const genres = require('./routes-vidly/genres')
const customers = require('./routes-vidly/customers')
const movies = require('./routes-vidly/movies')
const rental = require('./routes-vidly/rental')

mongoose.connect('mongodb://localhost/vidly')
    .then(()=>console.log("connected to mongodb"))
    .catch((err)=>console.log("couldn't connect to mongodb"))

app.use(express.json())
app.use('/api/customers', customers)
app.use('/api/movies',movies)

app.use('/api/genres', genres)
app.use('/api/rental', rental)

app.use('/',(req, res)=>{
    res.send("welcome to vidly")
})



const port = process.env.PORT || 3002
app.listen(port, () => console.log(`listening on ${port} ....`))