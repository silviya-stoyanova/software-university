// constructor()
// property data, instanceof Array, length 0

// add(item)
// pass item of any type

// sumNums()
// test with array with items of any type
// test with array with only items of type 'number'

// removeByFilter(filterFunc)
// pass diff funcs

// toString()
// an array of multiple items
// an empty array

let mocha = require('mocha')
let assert = require('chai').assert
let Sumator = require('./sumator')

describe('tests for class Summator', () => {
    let sumator
    beforeEach(() => {
        sumator = new Sumator()
    })

    describe('test the constructor', () => {
        it('should have only one property', () => {
            let res1 = Object.getPrototypeOf(sumator).hasOwnProperty('add')
            let res2 = Object.getPrototypeOf(sumator).hasOwnProperty('sumNums')
            let res3 = Object.getPrototypeOf(sumator).hasOwnProperty('removeByFilter')
            let res4 = Object.getPrototypeOf(sumator).hasOwnProperty('toString')

            assert.equal(res1, true)
            assert.equal(res2, true)
            assert.equal(res3, true)
            assert.equal(res4, true)
        })

        it('should have property data', () => {
            assert.property(sumator, 'data')
        })

        it('this.data should be an instance of Array', () => {
            let instanceofArray = sumator.data instanceof Array
            assert.equal(instanceofArray, true)
        })

        it('this.data should have length 0', () => {
            let dataLength = sumator.data.length
            assert.equal(dataLength, 0)
        })
    })

    describe('test add()', () => {
        it('passes a number', () => {
            sumator.add(23)
            let result = sumator.toString()
            assert.equal(result, '23')
        })

        it('passes number and string', () => {
            sumator.add(12)
            sumator.add('twenty')
            let result = sumator.toString()
            assert.equal(result, '12, twenty')
        })

        it('passes an obj and array', () => {
            sumator.add({ num: 12 })
            sumator.add([31, 12, 1])
            let result = JSON.stringify(sumator.data)
            assert.equal(result, '[{"num":12},[31,12,1]]')  //? which one
        })

        it('passes an obj and array', () => {
            sumator.add({ num: 12 })
            sumator.add([31, 12, 1])
            let result = sumator.data.toString()
            assert.equal(result, '[object Object],31,12,1')  //? which one
        })
    })

    describe('test sumNums()', () => {
        it('sum is initialised with value = 0', () => {
            let sum = sumator.sumNums()
            assert.equal(sum, 0)
        })

        it('test with array with items of any type', () => {
            sumator.add(12)
            sumator.add('twenty')
            sumator.add(56)
            sumator.add('30')
            sumator.add('eighty')
            sumator.add([1, 2, 3])
            let sum = sumator.sumNums()
            assert.equal(sum, 68)
        })

        it('test with array with items of any type', () => {
            sumator.add(12)
            sumator.add(36)
            sumator.add(10)
            let sum = sumator.sumNums()
            assert.equal(sum, 58)
        })
    })

    describe('test removeByFilter()', () => {
        it('filters out numbers', () => {
            sumator.add(122)
            sumator.add([36, 1, 2])
            sumator.add(10)

            let filterFunc = (x) => {
                return typeof x === 'number'
            }

            sumator.removeByFilter(filterFunc)
            let result = sumator.toString()
            assert.equal(result, '36,1,2')
        })

        it('filters out odd numbers', () => {
            sumator.add(122)
            sumator.add('i am a string')
            sumator.add(10)
            sumator.add(1)
            sumator.add(3)
            sumator.add(5)
            sumator.add(7)

            let filterFunc = (x) => {
                return x % 2 === 1
            }

            sumator.removeByFilter(filterFunc)
            let result = sumator.toString()
            assert.equal(result, '122, i am a string, 10')
        })

    })

    describe('test toString()', () => {
        it('passes an array of multiple items', () => {
            sumator.add(12)
            sumator.add(36)
            sumator.add(10)
            let result = sumator.toString()
            assert.equal(result, '12, 36, 10')
        })

        it('passes an array of one item', () => {
            sumator.add(10)
            let result = sumator.toString()
            assert.equal(result, '10')
        })

        it('passes an empty array', () => {
            let result = sumator.toString()
            assert.equal(result, '(empty)')
        })
    })
})