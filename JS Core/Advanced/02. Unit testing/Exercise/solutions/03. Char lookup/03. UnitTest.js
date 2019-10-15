let mocha = require('mocha')
let assert = require('chai').assert
let lookupChar = require('./08. Char Lookup')

describe('lookupChar', function () {
    it('receive a number instead of string', function () {
        let result = lookupChar(789, 2)
        assert.equal(result, undefined)
    })

    it('receive a decimal number', function () {
        let result = lookupChar('thisIsAString', 1.2)
        assert.equal(result, undefined)
    })

    // index equal to the string's length
    it('receive too big index', function () {
        let result = lookupChar('animal', 6)
        assert.equal(result, "Incorrect index")
    })

    it('receive a negative index', function () {
        let result = lookupChar('myString', -5)
        assert.equal(result, "Incorrect index")
    })

    it('receive correct input', function () {
        let result = lookupChar('cat', 2)
        assert.equal(result, 't')
    })
})