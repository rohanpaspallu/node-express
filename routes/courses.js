const express = require('express')
const router = express.Router()

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' }
]

router.get('/', (req, res) => {
    res.send(courses)
})

router.get('/:id', (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id))
    if (!course) {
        return res.status(404).send('course not found')
    }
    res.send(course)
})

router.post('/', (req, res) => {

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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router