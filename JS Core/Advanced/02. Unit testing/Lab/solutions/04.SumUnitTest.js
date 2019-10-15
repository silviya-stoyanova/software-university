const mocha = require('mocha')
const assert = require('chai').assert
const sum = require('./04.SumOfNumbers')

describe('sum', function () {
    it('check typical act', function () {
        let input = ['123', 123]
        let result = sum(input)
        assert.equal(result, 246)
    })

    it('check negative summing', function () {
        let input = [-1, -10, -5, 2]
        let result = sum(input)
        assert.equal(result, -14)
    })

    it('check summing strings', function () {
        let input = [ '132', '1', '0']
        let result = sum(input)
        assert.equal(result, 133)
    })
})
