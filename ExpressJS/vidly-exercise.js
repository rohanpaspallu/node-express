const winston = require('winston')
const express = require('express')
const app = express()

// require('./startup/routes')(app)
// require('./startup/db')()
// require('./startup/logging')()
// require('./startup/config')()
// require('./startup/validation')()

// const port = process.env.PORT || 3004
// app.listen(port, () => winston.info(`listening on ${port} ....`))


const config = require('config')
const Joi = require('joi')



require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')()
require('./startup/validation')()
require('./startup/logging')()

app.use('/',(req, res)=>{
    res.send("welcome to vidly")
})



const port = process.env.PORT || 3002
app.listen(port, () => winston.info(`listening on ${port} ....`))