let mocha = require('mocha')
let chai = require('chai')
let isOddOrEven = require('./02.EvenOrOdd')

describe('isOddOrEven', function () {
    it('check even functionality', function () {
        let result = isOddOrEven('thisIsEvenString')
        chai.assert.equal(result, 'even')
    })

    it('takes a number as input', function () {
        let result = isOddOrEven(1566)
        chai.assert.equal(result, undefined)
    })

    it('take several consecutive strings', function () {
        let evenResult = isOddOrEven('1234')
        chai.assert.equal(evenResult, 'even')

        let oddResult = isOddOrEven('qwert')
        chai.assert.equal(oddResult, 'odd')

        let undefinedResult = isOddOrEven('[array, lala]')
        chai.assert.equal(undefinedResult, undefined)
    })

    it('check with odd string', function () {
        let result = isOddOrEven('oddString')
        chai.expect(result).to.equal('odd')
    })

    it('take an object as input', function () {
        let result = isOddOrEven({ thisIs: 'anObject' })
        result.chai.should.equal(undefined)
    })
})