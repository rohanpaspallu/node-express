const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(()=> console.log("connected to mongo-exercises"))
    .catch((err)=>console.log(err[0].message))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    isPublished: Boolean,
    date: {type: Date, default: Date.now},
    price: Number
})

const Course = mongoose.model('Course', courseSchema)

async function getCourses(){
    const courses = await Course
        .find({isPublished: true})
        .or([
            {price: {$gte: 15}}, 
            {name: /.*by.*/i }
        ])
        .sort({price:-1})
        .select('price name author')

    console.log(courses)
}

getCourses()