console.log('before')

/*===================================CALLBACK==============================*/
// getUser(1, displayUsers)

// function displayRepositories(val){
//     console.log(val)
// }

// function displayUsers(user){
//     console.log('user:', user)
//     getRepositories(user.gitHubUsername, displayRepositories)
// }


/*===================================PROMISE==============================*/
// getUser(1)
//     .then(user=>getRepositories(user.gitHubUsername))
//     .then(repo =>console.log(repo))
//     .catch(err=>console.log(err.message))



/*===================================ASYNC AWAIT==============================*/
async function displayCommits() {
    try {
        const user = await getUser(1)
        const repo = await getRepositories(user.gitHubUsername)

        console.log(repo)
    }
    catch (err) {
        console.log(err)
    }
}

displayCommits()


// console.log(user)
console.log('after')

function getUser(id) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('reading a user from db....')
            // resolve({ id, gitHubUsername: 'rohan' })
            reject(new Error('this reason'))
        }, 2000)
    })

}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("calling from github api")
            resolve(['repo1', 'repo2', 'repo3'])
        }, 2000)
    })
}