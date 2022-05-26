const request = require('supertest')
const {Genre} = require('../../models/genres')
let server

describe('/api/genres', ()=>{
    beforeEach(()=>{server = require('../../vidly-exercise')})
    afterEach(async()=> {
        server.close()
        await Genre.remove({})
    })

    describe('GET /:id', ()=>{
        jest.setTimeout(20000)
        it('should return genre if valid id is passed', async()=>{
            const genre = new Genre({name: 'genre1'})
            await genre.save()

            const res = await request(server).get('/api/genres/'+ genre._id)
            expect(res.status).toBe(200)
            expect(res.body).toMatchObject(genre)
        })
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

    
})