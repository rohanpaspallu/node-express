const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground_embedded_db')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: authorSchema
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId){
  const course = await Course.update({_id: courseId},{
    $set:{
      'author.name':"ronnie"
    },
    // $unset:{
    //   'author.name':""
    // }
  })
  // course.author.name = "rohan deepak paspallu"
  course.save()
}

updateAuthor('627938c786916cbbfa9f0c23')

// createCourse('Node Course', new Author({ name: 'Rohan' }));
