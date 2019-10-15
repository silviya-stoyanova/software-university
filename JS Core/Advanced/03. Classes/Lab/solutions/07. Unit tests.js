const { assert } = require('chai')
const StringBuilder = require('./07. String Builder')

describe('StringBuilder', function () {
    let sb
    beforeEach(function () {
        sb = new StringBuilder()
    })

    describe('test the constructor', function () {
        it('pass an empty input', function () {
            let result = sb.toString()
            assert.equal(result, '')
        })

        it('pass a string', function () {
            sb = new StringBuilder('town')
            let result = sb.toString()
            assert.equal(result, 'town')
        })

        // it('pass an object', function () {
        //     sb = new StringBuilder({ obj: 132 })
        //     let result = () => {
        //         sb.toString()
        //     }
        //     assert.throws(result, "Argument must be a string")
        // })
    })


})
