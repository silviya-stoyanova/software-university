// check launch.json

let mocha = require('mocha')
let assert = require('chai').assert
let PizzUni = require('./02. PizzUni_Ресурси')

describe('unit tests', () => {
    let pizzuni

    beforeEach(() => {
        pizzuni = new PizzUni()
    })

    describe('constructor', () => {
        it('registeredUsers', () => {
            let result = JSON.stringify(pizzuni.registeredUsers)
            assert.equal(result, '[]')
        })

        it('availableProducts', () => {
            let result = JSON.stringify(pizzuni.availableProducts)
            assert.equal(result, '{"pizzas":["Italian Style","Barbeque Classic","Classic Margherita"],"drinks":["Coca-Cola","Fanta","Water"]}')
        })

        it('orders', () => {
            let result = JSON.stringify(pizzuni.orders)
            assert.equal(result, '[]')
        })
    })

    describe('registerUser', () => {    //existing/non existing
        it('pass non existing one', () => {
            let result = JSON.stringify(pizzuni.registerUser('em1'))
            assert.equal(result, '{"email":"em1","orderHistory":[]}')
        })

        it('pass existing one', () => {
            pizzuni.registerUser('em1')
            let result = () => {
                return pizzuni.registerUser('em1')
            }
            assert.throw(result, `This email address (em1) is already being used!`)
        })
    })

    describe('makeAnOrder', () => {
        it('pass valid data', () => {
            pizzuni.registerUser('em1')
            let result = pizzuni.makeAnOrder('em1', 'Italian Style', 'Fanta')
            assert.equal(result, 0)
        })

        it('pass no drink', () => {
            pizzuni.registerUser('em1')
            let result = pizzuni.makeAnOrder('em1', 'Italian Style')
            assert.equal(result, 0)
        })

        it('pass non existing pizza', () => {
            pizzuni.registerUser('em1')
            let result = () => pizzuni.makeAnOrder('em1', 'pizza', 'drink')
            assert.throw(result, 'You must order at least 1 Pizza to finish the order.')
        })
        it('pass undefined as pizza', () => {
            pizzuni.registerUser('em1')
            let result = () => pizzuni.makeAnOrder('em1', undefined, 'drink')
            assert.throw(result, 'You must order at least 1 Pizza to finish the order.')
        })

        it('pass non existing user', () => {
            let result = () => pizzuni.makeAnOrder('em1', 'Italian Style', 'Fanta')
            assert.throw(result, `You must be registered to make orders!`)
        })
    })

    describe('detailsAboutMyOrder(id)', () => {
        it('pass existing id', () => {
            pizzuni.registerUser('em1')
            pizzuni.makeAnOrder('em1', 'Italian Style')
            let result = pizzuni.detailsAboutMyOrder(0)
            let expected = `Status of your order: pending`
            assert.equal(result, expected)
        })

        it('pass non existing id', () => {
            pizzuni.registerUser('em1')
            pizzuni.makeAnOrder('em1', 'Italian Style')
            let result = pizzuni.detailsAboutMyOrder(10)
            assert.equal(result, undefined)
        })
    })

    describe('doesTheUserExist(email)', () => {
        it('pass existing email', () => {
            pizzuni.registerUser('em1')
            let result = JSON.stringify(pizzuni.doesTheUserExist('em1'))
            assert.equal(result, '{"email":"em1","orderHistory":[]}')
        })

        it('pass non existing email', () => {
            let result = pizzuni.doesTheUserExist('em1')
            assert.equal(result, undefined)
        })
    })

    describe('completeOrder()', () => {
        it('pass valid data', () => {
            pizzuni.registerUser('em1')
            pizzuni.makeAnOrder('em1', 'Italian Style')
            let result = JSON.stringify(pizzuni.completeOrder())
            assert.equal(result, '{"orderedPizza":"Italian Style","email":"em1","status":"completed"}')
        })

        // it('complete the order twice', () => {
        //     pizzuni.registerUser('em1')
        //     pizzuni.makeAnOrder('em1', 'Italian Style')
        //     pizzuni.completeOrder()
        //     let result = pizzuni.completeOrder()
        //     assert.equal(result, undefined)
        // })

        it('pass invalid data', () => {
            pizzuni.registerUser('em1')
            let result = JSON.stringify(pizzuni.completeOrder())
            assert.equal(result, undefined)
        })

    })

    describe('cons', () => {
        it('get registered users', () => {
            pizzuni.registerUser('em1')
            pizzuni.registerUser('em2')
            pizzuni.registerUser('em3')

            let result = JSON.stringify(pizzuni.registeredUsers)
            assert.equal(result, '[{"email":"em1","orderHistory":[]},{"email":"em2","orderHistory":[]},{"email":"em3","orderHistory":[]}]')
        })

        it('get orders', () => {
            pizzuni.registerUser('em1')
            pizzuni.makeAnOrder('em1', 'Italian Style', 'Fanta')
            pizzuni.makeAnOrder('em1', 'Italian Style', 'Water')

            let result = JSON.stringify(pizzuni.orders)
            assert.equal(result, '[{"orderedPizza":"Italian Style","orderedDrink":"Fanta","email":"em1","status":"pending"},{"orderedPizza":"Italian Style","orderedDrink":"Water","email":"em1","status":"pending"}]')
        })
        
        it('get orders', () => {
            pizzuni.registerUser('em1')
            pizzuni.makeAnOrder('em1', 'Italian Style', 'Fanta')
            pizzuni.makeAnOrder('em1', 'Italian Style', 'Water')

            let result = JSON.stringify(pizzuni.registeredUsers)
            assert.equal(result, '[{"email":"em1","orderHistory":[{"orderedPizza":"Italian Style","orderedDrink":"Fanta"},{"orderedPizza":"Italian Style","orderedDrink":"Water"}]}]')
        })
    })


})
