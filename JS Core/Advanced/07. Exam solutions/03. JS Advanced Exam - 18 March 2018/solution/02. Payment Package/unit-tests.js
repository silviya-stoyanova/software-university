// constructor
// property name, value, VAT = 20, active = true

// accessors for name
// accessors for value
// accessors for VAT
// accessors for active

// toString()
// active/inactive package

let mocha = require('mocha')
let assert = require('chai').assert
let PaymentPackage = require('./PaymentPackage')

describe('tests for PaymentPackage', () => {

    let paymentP
    beforeEach(() => {
        paymentP = new PaymentPackage('Salatka', 100)
    })

    describe('test the constructor', () => {
        it('should have property name', () => {
            let result = paymentP.name
            assert.equal(result, 'Salatka')
        })

        it('should have property value', () => {
            let result = paymentP.value
            assert.equal(result, 100)
        })

        it('should have property VAT = 20', () => {
            let result = paymentP.VAT
            assert.equal(result, 20)
        })

        it('should have property active = true', () => {
            let result = paymentP.active
            assert.equal(result, true)
        })
    })

    describe('test name accessors', () => {
        it('should have a getter', () => {
            let result = paymentP.name
            assert.equal(result, 'Salatka')
        })

        it('should have a setter', () => {
            paymentP.name = 'Broccoli'
            let result = paymentP.name
            assert.equal(result, 'Broccoli')
        })

        it('should have a type validation in the setter', () => {
            let result = () => {
                return paymentP.name = [35]
            }
            assert.throw(result, 'Name must be a non-empty string')
        })

        it('should have a length validation in the setter', () => {
            let result = () => {
                return paymentP.name = ''
            }
            assert.throw(result, 'Name must be a non-empty string')
        })
    })

    describe('test value accessors', () => {
        it('should have a getter', () => {
            let result = paymentP.value
            assert.equal(result, 100)
        })

        it('should have a setter', () => {
            paymentP.value = 12
            let result = paymentP.value
            assert.equal(result, 12)
        })

        it('should have a type validation in the setter', () => {
            let result = () => {
                return paymentP.value = 'Musaka'
            }
            assert.throw(result, 'Value must be a non-negative number')
        })

        it('should have a validation for positive nums in the setter', () => {
            paymentP.value = 0   //* new test
            let result = paymentP.value
            assert.equal(result, 0)
        })

        it('should have a validation for negative nums in the setter', () => {
            let result = () => {
                return paymentP.value = -10
            }
            assert.throw(result, 'Value must be a non-negative number')
        })
    })

    describe('test VAT accessors', () => {
        it('should have a getter', () => {
            let result = paymentP.VAT
            assert.equal(result, 20)
        })

        it('should have a setter', () => {
            paymentP.VAT = 12
            let result = paymentP.VAT
            assert.equal(result, 12)
        })

        it('should have a type validation in the setter', () => {
            let result = () => {
                return paymentP.VAT = 'Musaka'
            }
            assert.throw(result, 'VAT must be a non-negative number')
        })

        it('should have a validation for positive nums in the setter', () => {
            paymentP.VAT = 0    //* new test
            let result = paymentP.VAT
            assert.equal(result, 0)
        })

        it('should have a validation for negative nums in the setter', () => {
            let result = () => {
                return paymentP.VAT = -10
            }
            assert.throw(result, 'VAT must be a non-negative number')
        })
    })

    describe('test active accessors', () => {
        it('should have a getter', () => {
            let result = paymentP.active
            assert.equal(result, true)
        })

        it('should have a setter', () => {
            paymentP.active = false
            let result = paymentP.active
            assert.equal(result, false)
        })

        it('should have a type validation in the setter', () => {
            let result = () => {
                return paymentP.active = 'Musaka'
            }
            assert.throw(result, 'Active status must be a boolean')
        })
    })

    describe('test toString()', () => {
        it('pass an active package', () => {
            let result = paymentP.toString()
            assert.equal(result, 'Package: Salatka\n- Value (excl. VAT): 100\n- Value (VAT 20%): 120')
        })

        it('pass an inactive package', () => {
            paymentP.active = false
            let result = paymentP.toString()
            assert.equal(result, 'Package: Salatka (inactive)\n- Value (excl. VAT): 100\n- Value (VAT 20%): 120')
        })
    })
})