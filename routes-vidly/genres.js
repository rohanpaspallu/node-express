const express = require('express')
const router = express.Router()
const Joi = require('joi')

const genres = [
    {id: 1, name:"genre 1"},
    {id: 2, name:"genre 2"}
]

router.get('/', (req, res) => {
    res.send(genres)
})

router.get('/:id', (req, res) => {
    const genre = genres.find(g=>g.id===parseInt(req.params.id))

    if (!genre) return res.status(404).send("genre not found")
    res.send(genre)

})

router.post('/', (req, res) => {
    // res.send(req.body.name)
    const {error} = validateGenre(req.body)

    if(error) return res.status(400).send(error.details[0].message)

    const genre = {
        id: genres.length +1,
        name: req.body.name}

    genres.push(genre)
    res.send(genres)
})



router.put('/:id', (req, res) => {
    const genre = genres.find(g=>g.id===parseInt(req.params.id))
    if (!genre) return res.status(404).send("genre not found")

    const {error} = validateGenre(req.body)

    if(error) return res.status(400).send(error.details[0].message)

    genre.name = req.body.name

    res.send(genres)

})

router.delete('/:id', (req, res) => {

    const genre = genres.find(g=>g.id===parseInt(req.params.id))
    if (!genre) return res.status(404).send("genre not found")

    const index = genres.indexOf(genre)
    genres.splice(index, 1)

    res.send(genres)
})

function validateGenre(genre) {
    const schema = { name: Joi.string().min(3).required() }
    return Joi.validate(genre, schema)
}

module.exports = router