
async function answer() {
  try {
    const customer = await getCustomer(1)
    console.log('Customer: ', customer);
    if (customer.isGold) {
      const topMovie = await getTopMovies()
      console.log('Top movies: ', topMovie);
      const email = await sendEmail(customer.email, topMovie)
        console.log('email sent')
    }


  } catch (error) {
    console.log(error)
  }
}

answer()

getCustomer(1, (customer) => {
  console.log('Customer: ', customer);
  if (customer.isGold) {
    getTopMovies((movies) => {
      console.log('Top movies: ', movies);
      sendEmail(customer.email, movies, () => {
        console.log('Email sent...')
      });
    });
  }
});

function getCustomer(id) {
  return new Promise((resolve, reject)=>{
    setTimeout(() => {
      resolve({
        id: 1,
        name: 'Mosh Hamedani',
        isGold: true,
        email: 'email'
      });
    }, 4000);
  })
  
}

function getTopMovies() {
  return new Promise((resolve, reject)=>{
  setTimeout(() => {
    resolve(['movie1', 'movie2']);
  }, 4000);})
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject)=>{
  setTimeout(() => {
    resolve();
  }, 4000);})
}