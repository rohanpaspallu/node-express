const joi = require('joi')
const express = require('express')
const app = express()

app.get('/api/courses',(req, res)=>{

})

app.get('/api/courses/:id',(req, res)=>{
    
})

app.post('/api/courses',(req, res)=>{

})

app.put('/api/courses/:id',(req, res)=>{
    
})

app.delete('/api/courses/:id',(req, res)=>{
    
})

const port = process.env.PORT|| 3001
console.log(port)
app.listen(port, ()=>console.log("connected to port 3001...."))