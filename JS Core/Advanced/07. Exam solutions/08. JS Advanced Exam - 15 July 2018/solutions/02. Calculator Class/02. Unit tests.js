// The methods should function correctly for
// positive, negative and floating point numbers.
// In case of floating point numbers the result should be
// considered correct if it is within 0.01 of the correct value.

//1. the property expenses is initialized to an empty array

//2. add(data) – adds a passed in positive numbers to the expenses
//             – adds a passed in negative numbers to the expenses
//             – adds a passed in floating-point numbers to the expenses
//             – adds a passed in string to the expenses
//             – adds a passed in array  to the expenses
//             – adds a passed in object to the expenses

//3. divideNums() – дели числата от масива помежду им
//             - the expenses includes positive numbers
//             - the expenses includes negative numbers
//             - the expenses includes floating-point numbers
//             - the expenses includes 0
//             - the expenses includes everything but numbers => throw error
//             - the expenses includes everything

//! this is done while testing the other funcionalities of the class:
//4. toString() - returns a string, containing a list of all items
//              - if there are items
//              - if the array is empty => return 'empty array'

//5. orderBy()  - sort expenses
//              - if there are only nums - positive, negative and fl.-p.
//              - if there is mixed data
//              - if the array is empty

let mocha = module.require('mocha')
let assert = module.require('chai').assert
let Calculator = module.require('./02. Calculator Class')

describe('calculateClass', function () {
    let calc

    beforeEach(() => {
        calc = new Calculator()
    })

    it('asserts the property expenses is initialized to an empty array', function () {
        let result = calc.toString()
        assert.equal(result, 'empty array')
    })

    it('add positive nums', function () {
        calc.add(2)
        calc.add(3)
        calc.add(800)
        let result = calc.toString()
        assert.equal(result, '2 -> 3 -> 800')
    })

    it('add negative nums', function () {
        calc.add(-2)
        calc.add(-3)
        calc.add(-800)
        let result = calc.toString()
        assert.equal(result, '-2 -> -3 -> -800')
    })

    it('add floating-point nums', function () {
        calc.add(-2.2)
        calc.add(3.5)
        calc.add(80.0001)
        let result = calc.toString()
        assert.equal(result, '-2.2 -> 3.5 -> 80.0001')
    })

    it('add a string', function () {
        calc.add('123')
        calc.add('lalala')
        calc.add('yoloo')
        let result = calc.toString()
        assert.equal(result, '123 -> lalala -> yoloo')
    })

    it('add an array', function () {
        calc.add(['hi', 'therE'])
        calc.add(-2.2)
        let result = calc.toString()
        assert.equal(result, 'hi,therE -> 2.2')
    })

    it('add an object', function () {               //..??
        calc.add({ hi: 12, therE: 21 })
        calc.add(-2.2)
        let result = calc.toString()
        assert.equal(result, '[object Object] -> 2.2')
    })

    it('delete only positive numbers', function () {
        calc.add(200)
        calc.add(5)
        calc.add(2)
        let result = calc.divideNums()
        assert.equal(result, '20')
    })

    it('delete with an odd number of negative numbers', function () {
        calc.add(200)
        calc.add(-5)
        calc.add(-2)
        calc.add(-1)
        let result = calc.divideNums()
        assert.equal(result, '-20')
    })

    it('delete with an even number of negative numbers', function () {
        calc.add(200)
        calc.add(-5)
        calc.add(-2)
        let result = calc.divideNums()
        assert.equal(result, '20')
    })

    it('delete with floating-point numbers', function () {
        calc.add(200)
        calc.add(-5.5)
        calc.add(2.8)
        let result = calc.divideNums()
        assert.closeTo(result, '-12.987013', 0.01) // or '-12.987' ?
    })

    it('delete with 0', function () {
        calc.add(200)
        calc.add(0)
        calc.add(2)
        // let result = calc.toString()
        let result = calc.divideNums()
        assert.equal(result, 'Cannot divide by zero')
    })

    it('delete with everything but numbers', function () {
        calc.add('I am a number')
        calc.add(['hihihi'])
        let result = function () {  // ????????????
            calc.divideNums()
        }
        assert.throws(result, 'There are no numbers in the array!')
    })

    it('delete with everything', function () {
        calc.add('25')
        calc.add(50)
        calc.add(10)
        calc.add('I am a number')
        calc.add(['hihihi'])
        let result = calc.divideNums()
        assert.equal(result, '5')
    })

    it('sort expenses including only nums', function () {
        calc.add(25)
        calc.add(-8)
        calc.add(50)
        calc.add(10)
        let result = calc.orderBy()
        assert.equal(result, '-8, 10, 25, 50')
    })

    it('sort expenses including mixed data', function () {
        calc.add(250)
        calc.add('closure')
        calc.add(50)
        calc.add('az')
        let result = calc.orderBy()
        assert.equal(result, '250, 50, az, closure')
    })

    it('sort expenses including mixed data', function () {
        calc.add(250)
        calc.add('closure')
        calc.add(50)
        output.add(['aa', '123321'])
        calc.add('az')
        let result = calc.orderBy()
        assert.equal(result, '250, 50, aa,123321, az, closure')
    })
})