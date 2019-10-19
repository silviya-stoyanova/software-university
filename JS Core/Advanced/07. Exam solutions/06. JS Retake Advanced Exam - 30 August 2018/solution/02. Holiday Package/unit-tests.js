// constructor
// vacationers = []
// destination = destination
// season = season
// insuranceIncluded = false by default

// showVacationers()
// if there is one vacationer
// if there are more vacationers
// if there are NO vacationers

// addVacationer(vacationerName)
// pass a valid name - firstName middleName
// pass an INvalid name - number
// pass an INvalid name - ' '
// pass an INvalid name - onlyFirstName
// pass an INvalid name - firstName middleName lastName

// setter insuranceIncluded
// pass a 'string'
// pass false, get insuranceIncluded
// pass true, get insuranceIncluded

// generateHolidayPackage()
// if there are no vacationers
// if there is one vacationer
// if there are more vacationers

// season - 'summer'/'winter'/'other'
// insuranceIncluded - 'true'/'false'

let mocha = require('mocha')
let assert = require('chai').assert
let HolidayPackage = require('./HolidayPackage')

describe('unit tests for HolidayPackage', () => {
    let hPackege
    beforeEach(() => {
        hPackege = new HolidayPackage('Paris', 'Winter')  //! do not change
    })

    describe('test the contructor', () => {
        it('should have vacationers property - []', () => {
            let result = JSON.stringify(hPackege.vacationers)
            assert.equal(result, '[]')
        })

        it('should have destination property', () => {
            let result = hPackege.destination
            assert.equal(result, 'Paris')
        })

        it('should have season property', () => {
            let result = hPackege.season
            assert.equal(result, 'Winter')
        })

        it('should have insuranceIncluded property', () => {
            let result = hPackege.insuranceIncluded
            assert.equal(result, false)
        })
    })

    describe('test showVacationers()', () => {
        it('if there is one vacationer', () => {
            hPackege.addVacationer('Kartof4o K')
            let result = hPackege.showVacationers()
            assert.equal(result, 'Vacationers:\nKartof4o K')
        })

        it('if there are more vacationers', () => {
            hPackege.addVacationer('Biskvitka Bisk')
            hPackege.addVacationer('Kartof4o K')
            let result = hPackege.showVacationers()
            assert.equal(result, 'Vacationers:\nBiskvitka Bisk\nKartof4o K')
        })

        it('if there are NO vacationers', () => {
            let result = hPackege.showVacationers()
            assert.equal(result, 'No vacationers are added yet')
        })
    })

    describe('test addVacationer(vacationerName)', () => {
        it('pass a valid name', () => {
            hPackege.addVacationer('Test Testov')
            let result = hPackege.showVacationers()
            assert.equal(result, 'Vacationers:\nTest Testov')
        })

        it('pass an INvalid name - number', () => {
            let result = () => {
                return hPackege.addVacationer(4)
            }
            assert.throw(result, 'Vacationer name must be a non-empty string')
        })

        it('pass an INvalid name - empty string', () => {
            let result = () => {
                return hPackege.addVacationer(' ')
            }
            assert.throw(result, 'Vacationer name must be a non-empty string')
        })

        it('pass an INvalid name - onlyFirstName', () => {
            let result = () => {
                return hPackege.addVacationer('onlyFirstNameHere')
            }
            assert.throw(result, 'Name must consist of first name and last name')
        })

        it('pass an INvalid name - empty string', () => {
            let result = () => {
                return hPackege.addVacationer('firstName middleName lastName')
            }
            assert.throw(result, 'Name must consist of first name and last name')
        })
    })

    describe('test accessor insuranceIncluded', () => {
        it('pass a string', () => {
            let result = () => {
                return hPackege.insuranceIncluded = 'i am boolean xixi'
            }
            assert.throw(result, 'Insurance status must be a boolean')
        })

        it('pass false', () => {
            hPackege.insuranceIncluded = false
            let result = hPackege.insuranceIncluded
            assert.equal(result, false)
        })

        it('pass true', () => {
            hPackege.insuranceIncluded = true
            let result = hPackege.insuranceIncluded
            assert.equal(result, true)
        })
    })

    describe('test generateHolidayPackage()', () => {
        it('if there are no vacationers', () => {
            let result = () => {
                return hPackege.generateHolidayPackage()
            }
            assert.throw(result, 'There must be at least 1 vacationer added')
        })

        it('if there are is one vacationer', () => {         // Winter
            hPackege.addVacationer('Vakanciq Pochivka')
            let result = hPackege.generateHolidayPackage()
            assert.equal(result, 'Holiday Package Generated\nDestination: Paris\nVacationers:\nVakanciq Pochivka\nPrice: 600')
        })

        it('if there are is one vacationer during other season than Summer/Winter', () => {         // Winter
            hPackege = new HolidayPackage('Paris', 'hotPeppers')  // Summer
            hPackege.addVacationer('Vakanciq Pochivka')
            let result = hPackege.generateHolidayPackage()
            assert.equal(result, 'Holiday Package Generated\nDestination: Paris\nVacationers:\nVakanciq Pochivka\nPrice: 400')
        })

        it('if there are more vacationers', () => {
            hPackege = new HolidayPackage('Paris', 'Summer')  // Summer
            hPackege.addVacationer('Vakanciq Pochivka')
            hPackege.addVacationer('Summer Timeee')
            let result = hPackege.generateHolidayPackage()
            assert.equal(result, 'Holiday Package Generated\nDestination: Paris\nVacationers:\nVakanciq Pochivka\nSummer Timeee\nPrice: 1000')
        })

        it('if there are more vacationers with insurance included', () => {
            hPackege.addVacationer('Vakanciq Pochivka')
            hPackege.addVacationer('Summer Timeee')
            hPackege.insuranceIncluded = true
            let result = hPackege.generateHolidayPackage()
            assert.equal(result, 'Holiday Package Generated\nDestination: Paris\nVacationers:\nVakanciq Pochivka\nSummer Timeee\nPrice: 1100')
        })
    })
})