let mocha = require('mocha')
let expect = require('chai').expect
let mathEnforcer = require('./09. Math Enforcer')

// add  => to.be.closeTo(-9.9, 0.01) to all expected results ??
describe('mathEnforcer', function () {

    //test addFive
    it('test addFive with a string', function () {
        let result = mathEnforcer.addFive('text')
        expect(result).to.equal(undefined)
    })

    it('test addFive with a negative number', function () {
        let result = mathEnforcer.addFive(-2)
        expect(result).to.be.closeTo(3, 0.01)
    })

    it('test addFive with a floating-point number', function () {
        let result = mathEnforcer.addFive(2.1)
        expect(result).to.be.closeTo(7.1, 0.01)
    })

    it('test addFive with a positive number', function () {
        let result = mathEnforcer.addFive(12)
        expect(result).to.be.closeTo(17, 0.01)
    })


    //test subtractTen
    it('test subtractTen with a string', function () {
        let result = mathEnforcer.subtractTen('lala')
        expect(result).to.equal(undefined)
    })

    it('test subtractTen with a negative number', function () {
        let result = mathEnforcer.subtractTen(-22)
        expect(result).to.equal(-32)
    })

    it('test subtractTen with a floating-point number', function () {
        let result = mathEnforcer.subtractTen(0.1)
        expect(result).to.be.closeTo(-9.9, 0.01)
    })

    it('test subtractTen with a positive number', function () {
        let result = mathEnforcer.subtractTen(65)
        expect(result).to.equal(55)
    })


    //test sum
    it('test sum with a string and a number', function () {
        let result = mathEnforcer.sum('function', 25)
        expect(result).to.equal(undefined)
    })

    it('test sum with a number and a string', function () {
        let result = mathEnforcer.sum(15, 'testtest')
        expect(result).to.equal(undefined)
    })

    it('test sum with two strings', function () {
        let result = mathEnforcer.sum('123456', '78910')
        expect(result).to.equal(undefined)
    })



    it('test sum with two negative numbers', function () {
        let result = mathEnforcer.sum(-22, -2)
        expect(result).to.equal(-24)
    })

    it('test sum with two floating-point numbers', function () {
        let result = mathEnforcer.sum(0.1, 4.5)
        expect(result).to.be.closeTo(4.6, 0.01)
    })

    it('test sum with two positive numbers', function () {
        let result = mathEnforcer.sum(22, 30)
        expect(result).to.equal(52)
    })



    it('test sum with a whole number and a floating-point number ', function () {
        let result = mathEnforcer.sum(22, 2.8)
        expect(result).to.be.closeTo(24.8, 0.01)
    })

    // or just with floating-point number and negative number?
    it('test sum with positive floating-point number and negative floating-point number', function () {
        let result = mathEnforcer.sum(0.1, -4.5)
        expect(result).to.be.closeTo(4.6, 0.01)
    })

    it('test sum with positive number and negative number', function () {
        let result = mathEnforcer.sum(22, 30)
        expect(result).to.equal(52)
    })
})