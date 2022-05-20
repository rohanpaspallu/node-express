const genres = require('../routes-vidly/genres')
const customers = require('../routes-vidly/customers')
const movies = require('../routes-vidly/movies')
const rental = require('../routes-vidly/rental')
const users = require('../routes-vidly/users')
const auth = require('../routes-vidly/auth')
const error = require('../middleware/error')
const express = require('express')

module.exports = function(app){
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
}