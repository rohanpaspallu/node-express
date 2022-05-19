require('express-async-errors')
const winston = require('winston')
require('winston-mongodb')
const config = require('config')
const Joi = require('joi')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const genres = require('./routes-vidly/genres')
const customers = require('./routes-vidly/customers')
const movies = require('./routes-vidly/movies')
const rental = require('./routes-vidly/rental')
const users = require('./routes-vidly/users')
const auth = require('./routes-vidly/auth')
const error = require('./middleware/error')

// process.on('uncaughtException', ex =>{
//     // console.log("we got uncaught exception")
//     winston.error(ex.message, ex)
//     process.exit(1)
// })

winston.handleExceptions(
    new winston.transports.File({filename: 'uncaughtExceptions.log'})
)

process.on('unhandledRejection', ex =>{
    // console.log("we got unhandled rejection")
    // winston.error(ex.message, ex)
    // process.exit(1)
    throw ex
})

winston.add(winston.transports.File, {filename: 'logfiles.log'})
winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/vidly'})

// throw new Error("something went wrong")

const p = Promise.reject(new Error("Something failed miserably !"))
p.then(()=>console.log("done"))

if(!config.get('jwtPrivateKey')){
    console.log("FATAL ERROR: JWT private key not defined")
    process.exit(1)
}

mongoose.connect('mongodb://localhost/vidly')
    .then(()=>console.log("connected to mongodb"))
    .catch((err)=>console.log("couldn't connect to mongodb"))

app.use(express.json())
app.use('/api/customers', customers)
app.use('/api/movies',movies)
app.use('/api/users', users)
app.use('/api/genres', genres)
app.use('/api/rental', rental)
app.use('/api/auth', auth)
app.use(error)

app.use('/',(req, res)=>{
    res.send("welcome to vidly")
})



const port = process.env.PORT || 3002
app.listen(port, () => console.log(`listening on ${port} ....`))