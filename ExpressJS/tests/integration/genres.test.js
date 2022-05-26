
const request = require('supertest')
const {Genre} = require('../../models/genres')
const {User} = require('../../models/users')

let server

describe('/api/genres', ()=>{
    beforeEach(()=>{server = require('../../vidly-exercise')})
    afterEach(async()=> {
        server.close()
        await Genre.remove({})
    })

    describe('GET /', ()=>{
        it('should return all genres', async()=>{
            Genre.collection.insertMany([
                {name: 'genre1'},
                {name: 'genre2'},
                {name: 'genre3'},
                {name: 'genre4'},
                {name: 'genre5'},
                {name: 'genre6'},
            ])
            const res = await request(server).get('/api/genres')
            expect(res.status).toBe(200)
            console.log(res.body)
            expect(res.body.length).toBe(6)
            expect(res.body.some(g=>g.name === 'genre1')).toBeTruthy()
            
        })
    })

    describe('GET /:id', ()=>{
        // jest.setTimeout(20000)
        it('should return genre if valid id is passed', async()=>{
            const genre = new Genre({name: 'genre1'})
            await genre.save()

            const res = await request(server).get('/api/genres/'+ genre._id)
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('name',genre.name)
        })

        it('should return 404 if invalid id is passed', async()=>{
            const res = await request(server).get('/api/genres/1')
            expect(res.status).toBe(404)
        })
    })

    describe('POST /',()=>{
        it('should return 401 if client is not logged in', async()=>{
            const res = await request(server)
                .post('/api/genres')
                .send({name: 'genre1'})

            expect(res.status).toBe(401)
        })

        it('should return 400 if genre is less than 5 characters', async()=>{

            const token = new User().generateAuthToken()
            const res = await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({name: '1232'})

            expect(res.status).toBe(400)
        })

        it('should save the genre if its valid', async()=>{

            const token = new User().generateAuthToken()
            const res = await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({name: 'genre 1'})

            const genre = await Genre.find({name:'genre 1'})
            expect(genre).not.toBeNull()
        })

        it('should return the genre if its valid', async()=>{

            const token = new User().generateAuthToken()
            const res = await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({name: 'genre1'})

            expect(res.body).toHaveProperty('_id')
            expect(res.body).toHaveProperty('name', 'genre1')
        })
    })
})