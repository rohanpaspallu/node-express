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
        // .find({isPublished: true})
        .or([{tags: {$in:['frontend']}}, {tags: {$in:['backend']}}])
        .sort({price:-1})
        .select({price:1, name:1, author:1})

    console.log(courses)
}

getCourses()