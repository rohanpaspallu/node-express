const Joi = require('joi')
const express = require('express')
const app = express()
const genres = require('./routes-vidly/genres')

app.use(express.json())


app.use('/api/genres', genres)

app.use('/',(req, res)=>{
    res.send("welcome to vidly")
})



const port = process.env.PORT || 3002
app.listen(port, () => console.log(`listening on ${port} ....`))