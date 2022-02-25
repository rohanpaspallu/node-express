const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db')
const config = require('config')
const helmet = require('helmet')
const morgan = require('morgan')
const Joi = require('joi')
const logger = require('./middleware/logger')
const authenticator = require('./middleware/authenticator')
const express = require('express')
const app = express()
const courses = require('./routes/courses')
const home = require('./routes/home')

app.set('view engine', 'pug')
app.set('views', './views')

console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
console.log(`app: ${app.get('env')}`)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet())
app.use('/api/courses', courses)
app.use('/', home)

//configuration
console.log('Application name:' + config.get("name"))
// console.log('Mail password:'+ config.get("mail.password"))

if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
    console.log('morgan enabled')
    startupDebugger('morgan enabled')
}


app.use(logger)

app.use(authenticator)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on ${port} ....`))