const mocha = require('mocha')
const { assert } = require('chai')
const PaymentPackage = require('./09. Payment Package')

describe('PaymentPackage', function () {
    const paymentPackage
    beforeEach(function () {
        paymentPackage = new PaymentPackage()
    })

    describe('test name getter-setter', function () {

        it('pass an invalid value as a newValue', function () {
            let expectError = () => {
                paymentPackage.name = [1234]
            }
            assert.throws(expectError, Error)
        })

        it('pass an empty string', function () {
            let expectError = () => {
                paymentPackage.name = ''
            }
            assert.throws(expectError, Error)
        })

        it('pass a valid string', function () {
            paymentPackage.name = 'valiD sTrinG'
            let name = paymentPackage.name
            assert.equal(name, 'valiD sTrinG')
        })
    })


    describe('test value getter-setter', function () {

        it('pass an invalid value as a newValue', function () {
            let expectError = () => {
                paymentPackage.value = ["string"]
            }
            assert.throws(expectError, Error)
        })

        it('pass a negative number', function () {
            let expectError = () => {
                paymentPackage.value = -20
            }
            assert.throws(expectError, Error)
        })

        it('pass a valid number', function () {
            paymentPackage.value = 25
            let value = paymentPackage.value
            assert.equal(value, 25)
        })
    })


    describe('test VAT getter-setter', function () {

        it('pass an invalid value as a newValue', function () {
            let expectError = () => {
                paymentPackage.VAT = "two"
            }
            assert.throws(expectError, Error)
        })

        it('pass a negative number', function () {
            let expectError = () => {
                paymentPackage.VAT = -203
            }
            assert.throws(expectError, Error)
        })

        it('pass a valid number', function () {
            paymentPackage.VAT = 35
            let VAT = paymentPackage.VAT
            assert.equal(VAT, 35)
        })
    })


    describe('test active getter-setter', function () {

        it('pass an invalid value as a newValue', function () {
            let expectError = () => {
                paymentPackage.active = { boolean: 'yes' }
            }
            assert.throws(expectError, Error)
        })

        it('pass a valid value', function () {
            paymentPackage.active = false
            let active = paymentPackage.active
            assert.equal(active, false)
        })
    })

    describe('test toString method', function () {
        it('to string', function () {
            const output = [
                new PaymentPackage('HR Services', 1500),
                new PaymentPackage('Consultation', 800),
                new PaymentPackage('Partnership Fee', 7000),
            ];

            output.join('\n')

            let expected = [`Package: HR Services`]
            expected.push['- Value (excl. VAT): 1500']
            expected.push['- Value (VAT 20%): 1800']
            expected.push['Package: Consultation']
            expected.push['- Value (excl. VAT): 800']
            expected.push['- Value (VAT 20%): 960']
            expected.push['Package: Partnership Fee']
            expected.push[' - Value(excl.VAT): 7000']
            expected.push[' - Value(VAT 20 %): 8400']

            assert.equal(output, expected.join('\n'))
        })
    })
})