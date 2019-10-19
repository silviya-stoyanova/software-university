// constructor
// check for properties: _firstName, _lastName, _SSN
// _subscriptions - []
// _blocked - false

// accessors:
// get firstName, lastName, SSN, isBlocked
// TRY to set firstName, lastName, SSN, isBlocked

// addSubscription(line, startDate, endDate)
// push an {} in this._subscriptions
// push more {} in this._subscriptions

// isValid(line, date)
// pass blocked card
// pass NON blocked card
// -- 'for current line'/'for all lines'/'for another line'
// -- 'valid'/'invalid one'

// block()
// get this._blocked // isBlocked()

// unblock()
// get this._blocked // isBlocked()

let mocha = require('mocha')
let assert = require('chai').assert
let SubscriptionCard = require('./SubscriptionCard')

describe('unit tests for class SubscriptionCard', () => {
    let subscriptionCard
    beforeEach(() => {
        subscriptionCard = new SubscriptionCard('My', 'Name', '2019')
    })

    describe('test the constructor', () => {
        it('should have property _firstName', () => {
            let result = subscriptionCard._firstName
            assert.equal(result, 'My')
        })

        it('should have property _lastName', () => {
            let result = subscriptionCard._lastName
            assert.equal(result, 'Name')
        })

        it('should have property _SSN', () => {
            let result = subscriptionCard._SSN
            assert.equal(result, '2019')
        })

        it('should have property _subscriptions - []', () => {
            let result = JSON.stringify(subscriptionCard._subscriptions)
            assert.equal(result, '[]')
        })

        it('should have property _blocked', () => {
            let result = subscriptionCard._blocked
            assert.equal(result, false)
        })
    })

    describe('test the accessors', () => {
        it('gets the firstName', () => {
            let result = subscriptionCard.firstName
            assert.equal(result, 'My')
        })
        it('tries to set the firstName', () => {
            subscriptionCard.firstName = 'Lalalaaaaa'
            let result = subscriptionCard.firstName
            assert.equal(result, 'My')
        })


        it('gets the lastName', () => {
            let result = subscriptionCard.lastName
            assert.equal(result, 'Name')
        })
        it('tries to set the lastName', () => {
            subscriptionCard.lastName = 'Lalalaaaaa'
            let result = subscriptionCard.lastName
            assert.equal(result, 'Name')
        })


        it('gets the SSN', () => {
            let result = subscriptionCard.SSN
            assert.equal(result, '2019')
        })
        it('tries to set the SSN', () => {
            subscriptionCard.SSN = '0000'
            let result = subscriptionCard.SSN
            assert.equal(result, '2019')
        })


        it('gets the isBlocked', () => {
            let result = subscriptionCard.isBlocked
            assert.equal(result, false)
        })

        it('tries to set the isBlocked', () => {
            subscriptionCard.isBlocked = true
            let result = subscriptionCard.isBlocked
            assert.equal(result, false)
        })
    })

    describe('test addSubscription (line, startDate, endDate)', () => {
        it('call addSubscription once', () => {
            subscriptionCard.addSubscription('200', new Date('2017-05-25'), new Date('2019-05-25'))
            let result = JSON.stringify(subscriptionCard._subscriptions)
            assert.equal(result, '[{"line":"200","startDate":"2017-05-25T00:00:00.000Z","endDate":"2019-05-25T00:00:00.000Z"}]')
        })

        it('call addSubscription twice', () => {
            subscriptionCard.addSubscription('200', new Date('2017-05-25'), new Date('2019-05-25'))
            subscriptionCard.addSubscription('*', new Date('2018-05-25'), new Date('2018-06-24'))
            let result = JSON.stringify(subscriptionCard._subscriptions)
            assert.equal(result, '[{"line":"200","startDate":"2017-05-25T00:00:00.000Z","endDate":"2019-05-25T00:00:00.000Z"},{"line":"*","startDate":"2018-05-25T00:00:00.000Z","endDate":"2018-06-24T00:00:00.000Z"}]')
        })
    })

    describe('test isValid (line, date)', () => {
        it('receives a blocked card', () => {
            subscriptionCard.addSubscription('*', new Date('2019-01-02'), new Date('2020-12-01'))
            subscriptionCard.block()
            let result = subscriptionCard.isValid('*', new Date('2019-01-03'))
            assert.equal(result, false)
        })



        it('receives a card for all lines', () => {
            subscriptionCard.addSubscription('*', new Date('2019-01-02'), new Date('2020-12-01'))
            let result = subscriptionCard.isValid('*', new Date('2019-01-03'))
            assert.equal(result, true)
        })
        it('receives another line but has card for all lines', () => {
            subscriptionCard.addSubscription('*', new Date('2019-01-02'), new Date('2020-12-01'))
            let result = subscriptionCard.isValid('1', new Date('2019-01-03'))
            assert.equal(result, true)
        })
        it('receives a card for current line', () => {
            subscriptionCard.addSubscription('*', new Date('2019-01-02'), new Date('2020-12-01'))
            subscriptionCard.addSubscription('123', new Date('2019-01-02'), new Date('2020-12-01'))
            let result = subscriptionCard.isValid('123', new Date('2019-01-03'))
            assert.equal(result, true)
        })
        it('receives a card for another line', () => {
            subscriptionCard.addSubscription('123', new Date('2019-01-02'), new Date('2020-12-01'))
            let result = subscriptionCard.isValid('1', new Date('2019-01-03'))
            assert.equal(result, false)
        })



        it('receives a valid card, curr date is same as the initial. date', () => {
            subscriptionCard.addSubscription('123', new Date('2019-01-02'), new Date('2020-12-01'))
            let result = subscriptionCard.isValid('123', new Date('2019-01-02'))
            assert.equal(result, true)
        })
        it('receives a valid card, curr date is same as the exp. date', () => {
            subscriptionCard.addSubscription('123', new Date('2019-01-02'), new Date('2020-12-01'))
            let result = subscriptionCard.isValid('123', new Date('2020-12-01'))
            assert.equal(result, true)
        })



        it('receives an INvalid card, curr date is before the initial. date', () => {
            subscriptionCard.addSubscription('*', new Date('2019-01-02'), new Date('2020-12-01'))
            subscriptionCard.addSubscription('123', new Date('2019-01-02'), new Date('2020-12-01'))
            let result = subscriptionCard.isValid('123', new Date('2019-01-01'))
            assert.equal(result, false)
        })
        it('receives an INvalid card, curr date is after the exp. date', () => {
            subscriptionCard.addSubscription('*', new Date('2019-01-02'), new Date('2020-12-01'))
            subscriptionCard.addSubscription('123', new Date('2019-01-02'), new Date('2020-12-01'))
            let result = subscriptionCard.isValid('123', new Date('2020-12-03'))
            assert.equal(result, false)
        })
    })

    describe('test block() and unblock()', () => {
        it('test block()', () => {
            subscriptionCard.addSubscription('*', new Date('2019-01-02'), new Date('2020-12-01'))
            subscriptionCard.block()
            let result = subscriptionCard.isBlocked
            assert.equal(result, true)
        })

        it('test block() twice', () => {
            subscriptionCard.addSubscription('*', new Date('2019-01-02'), new Date('2020-12-01'))
            subscriptionCard.block()
            subscriptionCard.block()
            let result = subscriptionCard.isBlocked
            assert.equal(result, true)
        })

        it('test unblock()', () => {
            subscriptionCard.addSubscription('*', new Date('2019-01-02'), new Date('2020-12-01'))
            subscriptionCard.unblock()
            let result = subscriptionCard.isBlocked
            assert.equal(result, false)
        })

        it('test unblock() twice', () => {
            subscriptionCard.addSubscription('*', new Date('2019-01-02'), new Date('2020-12-01'))
            subscriptionCard.unblock()
            subscriptionCard.unblock()
            let result = subscriptionCard.isBlocked
            assert.equal(result, false)
        })

        it('test block() and unblock() combined', () => {
            subscriptionCard.addSubscription('*', new Date('2019-01-02'), new Date('2020-12-01'))
            subscriptionCard.block()
            subscriptionCard.unblock()
            let result = subscriptionCard.isBlocked
            assert.equal(result, false)
        })
    })
})