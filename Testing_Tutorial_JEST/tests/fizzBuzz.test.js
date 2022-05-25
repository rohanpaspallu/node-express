const ex1 = require('../exercise1')

describe('fizzBuzz',()=>{
    it('should throw an exception if input is not a number', ()=>{
        expect(()=>ex1.fizzBuzz('a')).toThrow()
        expect(()=>ex1.fizzBuzz(null)).toThrow()
        expect(()=>ex1.fizzBuzz(undefined)).toThrow()
        expect(()=>ex1.fizzBuzz({})).toThrow()
    })
    it('should return fizzbuzz',()=>{
        const result = ex1.fizzBuzz(15)
        expect(result).toBe('FizzBuzz')
    })

    it('should return fizz',()=>{
        const result = ex1.fizzBuzz(9)
        expect(result).toBe('Fizz')
    })

    it('should return buzz',()=>{
        const result = ex1.fizzBuzz(25)
        expect(result).toBe('Buzz')
    })

    it('should return number',()=>{
        const result = ex1.fizzBuzz(16)
        expect(result).toBe(16)
    })
})