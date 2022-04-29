const mongoose =  require('mongoose')

mongoose.connect('mongodb://localhost/playground')
    .then(()=> console.log('connected to mongodb .....'))
    .catch(err=> console.log(`couldn't connect to mongo DB.... ${err}`))

const courseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema)

async function createCourse(){
    const course = new Course({
        name: 'Node course',
        author: 'rohan deepak paspallu',
        tags: ['node','frontend'],
        isPublished: true
    })


    //---------------------------------------first method------------------------------------------------

    try{
        const result = await course.save()
        console.log(result)
    }
    catch (ex){
        console.log(ex.message)
    }
    
    //---------------------------------------second method------------------------------------------------
    //buggy code, not recommended
    
    // try{
    //     const isValid = await course.validate(err=>{
    //         if(err){
    //             console.log(err.message)
    //         }
    //     })
    // }
    // catch (ex){
    //     console.log(ex.message)
    // }

    

    
}

createCourse()

async function getCourses(){
    const courses = await Course
        .find({ author: 'rohan paspallu'})
        .limit(1)
        .sort({name: 1})
        .select({name: 1, tags: 1})

    console.log(courses)

}
//--------------------------------------Update Method 1-----------------------------------------------------------
// async function updateCourse(id){
//     const course = await Course.findById(id)
//     if(!course)return

//     course.isPublished = true
//     course.author = 'Nisarg'

//     const result = await course.save()
//     console.log(result)
// }

//--------------------------------------Update Method 2-----------------------------------------------------------
// async function updateCourse(id){
//     const result = await Course.update({_id: id},{
//         $set:{
//             author: 'Mosh',
//             isPublished: false
//         }
//     })
//     console.log(result)
// }

//--------------------------------------Update Method 3-----------------------------------------------------------
async function updateCourse(id){
    const course = await Course.findByIdAndUpdate(id,{
        $set:{
            author: 'Rohan',
            isPublished: true
        }
    },{new: true})
    console.log(course)
}

async function removeCourse(id){
    const result = await Course.deleteOne({_id:id})
    console.log(result)
}


// removeCourse('62631e4b97283ffff454d078')