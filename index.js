const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db')
const config = require('config')
const helmet = require('helmet')
const morgan = require('morgan')
const Joi = require('joi')
const logger = require('./logger')
const authenticator = require('./authenticator')
const express = require('express')
const app = express()

app.set('view engine', 'pug')
app.set('views', './views')

console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
console.log(`app: ${app.get('env')}`)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet())

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

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' }
]

app.get('/', (req, res) => {
    res.render('index', {
        title: 'My express app',
        message: 'hello'
    })
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id))
    if (!course) {
        return res.status(404).send('course not found')
    }
    res.send(course)
})

app.post('/api/courses', (req, res) => {

    const { error } = validateCourse(req.body)

    if (error) {
        res.status(400).send(result.error.details[0].message)
        return
    }

    // if(!req.body.name || req.body.name.length <3){
    //     res.status(400).send('name is required and should be minimum 3 chars')
    // }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(courses)
})

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))

    if (!course) {
        return res.status(404).send('course not found')
    }

    const { error } = validateCourse(req.body)

    if (error) {
        return res.status(400).send(result.error.details[0].message)
    }
    course.name = req.body.name
    // const newCourse = {id : course.id, name: req.body.name}

    // courses = [...courses, course]

    res.send(courses)

})

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        return res.status(404).send('course not found')
    }

    const index = courses.indexOf(course)
    courses.splice(index, 1)

    res.send(courses)
})

function validateCourse(course) {
    const schema = { name: Joi.string().min(3).required() }
    return Joi.validate(course, schema)
}

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on ${port} ....`))