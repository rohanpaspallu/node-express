require('express-async-errors')
const winston = require('winston')
require('winston-mongodb')

module.exports = function(){
    // process.on('uncaughtException', ex =>{
    //     // console.log("we got uncaught exception")
    //     winston.error(ex.message, ex)
    //     process.exit(1)
    // })

    winston.handleExceptions(
        new winston.transports.Console({ colorize: true, prettyPrint: true}),
        new winston.transports.File({filename: 'uncaughtExceptions.log'})
    )

    process.on('unhandledRejection', ex =>{
        // console.log("we got unhandled rejection")
        // winston.error(ex.message, ex)
        // process.exit(1)
        throw ex
    })

    winston.add(winston.transports.File, {filename: 'logfiles.log'})
    winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/vidly', level:'info'})

    // throw new Error("something went wrong")

    // const p = Promise.reject(new Error("Something failed miserably !"))
    // p.then(()=>console.log("done"))
}