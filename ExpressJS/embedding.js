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
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
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

async function addAuthors(courseId, author){
  const course = await Course.findById(courseId)
  course.authors.push(author)
  course.save()
}

async function removeAuthor(courseId, authorId){
  const course = await Course.findById(courseId)
  const author = course.authors.id(authorId)
  author.remove()
  course.save()
  console.log(course)
}

// updateAuthor('6279594fd4e8d45b151699ac')

// addAuthors('6279594fd4e8d45b151699ac', new Author({name:"Rajshree"}))

removeAuthor('6279594fd4e8d45b151699ac', '6279594fd4e8d45b151699ab')

// createCourse('Node Course', [
//   new Author({ name: 'Rohan' }),
//   new Author({ name: 'Deepak' }),
//   new Author({ name: 'Paspallu' }),
// ]);
