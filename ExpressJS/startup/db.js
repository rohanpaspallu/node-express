const mongoose = require('mongoose')
const winston = require('winston')
module.exports = function(){
    mongoose.connect()
    .then(()=>winston.info("connected to mongodb"))
}