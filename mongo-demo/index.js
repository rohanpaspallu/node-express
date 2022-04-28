const mongoose =  require('mongoose')

mongoose.connect('mongodb://localhost/playground')
    .then(()=> console.log('connected to mongodb .....'))
    .catch(err=> console.log(`couldn't connect to mongo DB.... ${err}`))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema)

// async function createCourse(){
//     const course = new Course({
//         name: 'Node course',
//         author: 'rohan paspallu',
//         tags: ['node','frontend'],
//         isPublished: true
//     })
    
//     const result = await course.save()
    
//     console.log(result)
// }

// createCourse()

async function getCourses(){
    const courses = await Course
        .find({ author: 'rohan paspallu'})
        .limit(1)
        .sort({name: 1})
        .select({name: 1, tags: 1})

    console.log(courses)

}

getCourses()