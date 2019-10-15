let mocha = require('mocha')
let assert = require('chai').assert
let isSymmetric = require('./05.CheckForSymmetry')

describe('isSymmetric', function () {
    it('check non symmetrical array', function () {
        let isSymmetrical = isSymmetric([1, 2, 3, 2, 1])
        assert.equal(isSymmetrical, true)
    })

    it('check not an array', function () {
        let isSymmetrical = isSymmetric(1234321)
        assert.equal(isSymmetrical, false)
    })

    it('check non symmetrical array', function () {
        let isSymmetrical = isSymmetric([12, -5, 123, 0])
        assert.equal(isSymmetrical, false)
    })

    it('name', function () {
        let isSymmetrical = isSymmetric(['0', 1, 1, 0])
        assert.equal(isSymmetrical, false)
    })

    it('name2', function () {
        let isSymmetrical = isSymmetric([0])
        assert.equal(isSymmetrical, true)
    })
})