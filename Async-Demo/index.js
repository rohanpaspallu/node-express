console.log('before')

getUser(1, (user)=>{
    console.log('user:', user)
    getRepositories(user.gitHubUsername, (val)=>{
        console.log(val)
    })
})



// console.log(user)
console.log('after')

function getUser(id, callback) {
    setTimeout(() => {
        console.log('reading a user from db....')
        callback({ id, gitHubUsername: 'rohan' })
    }, 2000)
} 

function getRepositories(username, callback){
    setTimeout(()=>{
        console.log("calling from github api")
        callback(['repo1', 'repo2', 'repo3'])
    },2000)
    
}