// constructor(capacity)

// if the class is initialised with property named 'capacity'
// test it's setter:
// -- if the 'capacity' is initialised with number > 0
// -- if the 'capacity' is initialised with number <= 0
// -- if the 'capacity' is initialised with string '22'
// test it's getter while testing its setter
//////////////////////////////////////////////////////////////////////////////
// constructor(availableProducts)

// if the class is initialised with property named 'availableProducts'
// if the property 'availableProducts' is an object
// if it has property 'Food' - empty object
// if it has property 'Drink' - empty object
//////////////////////////////////////////////////////////////////////////////
// addProduct(type, product, quantity) && occupiedCapacity() combined
// initialise the Warehouse with capacity to use it later // 10

// if the leftFreeSpace is >= than capacity
// -- if the product does not exist in availableProducts[type]
// -- if the product exists in availableProducts[type]
// if the leftFreeSpace is < than capacity throw an error
// add product twice
//////////////////////////////////////////////////////////////////////////////
// orderProducts(type)

// if there are no availableProducts[type]
// if there are some availableProducts[type] which are not ordered alphabet.
//////////////////////////////////////////////////////////////////////////////
// occupiedCapacity()
// with products
// without them
//////////////////////////////////////////////////////////////////////////////
// revision()
// if there are only products of type Food
// if there are only products of type Drink
// if there are products of type Food and Drink
// if the result is trimmed at the end
// if there are no products
//////////////////////////////////////////////////////////////////////////////
// scrapeAProduct(product, quantity)
// if the product is added
// -- if the given quantity is <= than the current product's quantity
// -- if the given quantity is > than the current product's quantity
// if the product does not exist throw an error

const mocha = require('mocha')
const assert = require('chai').assert
const Warehouse = require('./Warehouse')

describe('test warehouse class', () => {
    let warehouse
    beforeEach(() => {
        warehouse = new Warehouse(10)   //! do not change
    })


    describe('test the constructor"s property capacity', () => {
        it('is the class initialised with property named "capacity"', () => {
            assert.property(warehouse, 'capacity')
        })

        it('the "capacity" is initialised with number > 0', () => {
            warehouse = new Warehouse(1)
            let result = warehouse.capacity
            assert.equal(result, 1)
        })

        it('the "capacity" is initialised with number = 0', () => {
            let result = () => {
                warehouse = new Warehouse(0)
                warehouse.capacity
            }
            assert.throw(result, 'Invalid given warehouse space')
        })

        it('the "capacity" is initialised with number < 0', () => {
            let result = () => {
                warehouse = new Warehouse(-1)
                warehouse.capacity
            }
            assert.throw(result, 'Invalid given warehouse space')
        })

        it('if the "capacity" is initialised with string', () => {
            let result = () => {
                warehouse = new Warehouse('55')
                warehouse.capacity
            }
            assert.throw(result, 'Invalid given warehouse space')
        })
    })

    describe('test the constructor"s property "availableProducts"', () => {
        it('is the class initialised with property "availableProducts"', () => {
            assert.property(warehouse, 'availableProducts')
        })

        it('if "availableProducts" is an object with certain properties', () => {
            let availableProducts = Object.getOwnPropertyDescriptor(warehouse, 'availableProducts').value
            let result = JSON.stringify(availableProducts)
            assert.equal(result, '{"Food":{},"Drink":{}}')
        })
    })

    describe('test addProduct()', () => {
        it('if the leftFreeSpace is > 0', () => {
            let result = warehouse.addProduct('Food', 'milk', 2)
            // let value = Object.getOwnPropertyDescriptor(result, 'milk').value
            assert.isObject(result)
            // assert.property(result, 'milk')
            // assert.equal(value, 2)
        })

        it('if the leftFreeSpace is = 0', () => {
            let result = warehouse.addProduct('Food', 'milk', 10)
            // let value = Object.getOwnPropertyDescriptor(result, 'milk').value
            assert.isObject(result)
            // assert.property(result, 'milk')
            // assert.equal(value, 10)
        })

        // add the same product twice   ??????????????????????????????
        it('add more products', () => {
            warehouse.addProduct('Food', 'milk', 2)
            let availableFoods = warehouse.addProduct('Food', 'milk', 1)
            // let value = Object.getOwnPropertyDescriptor(availableFoods, 'milk').value
            assert.isObject(availableFoods)
            // assert.property(availableFoods, 'milk')
            // assert.equal(value, 3)
        })

        it('if the leftFreeSpace is < 0', () => {
            let result = () => { warehouse.addProduct('Food', 'bread', 100) }
            assert.throw(result, `There is not enough space or the warehouse is already full`)
        })
    })

    describe('test orderProducts()', () => {
        it('if there are some availableProducts[type]', () => {
            warehouse.addProduct('Food', 'waffle', 2)
            warehouse.addProduct('Food', 'biscuit', 3)
            warehouse.orderProducts('Food')
            let result = JSON.stringify(warehouse.availableProducts.Food)
            let expected = `{"biscuit":3,"waffle":2}`
            assert.equal(result, expected)
        })

        it('if there are no availableProducts[type]', () => {
            warehouse.addProduct('Food', 'waffle', 2)
            warehouse.addProduct('Food', 'biscuit', 2)
            warehouse.orderProducts('Drink')
            let result = JSON.stringify(warehouse.availableProducts.Drink)
            assert.equal(result, '{}')
        })
    })

    describe('test occupiedCapacity()', () => {
        it('if there are some products', () => {
            warehouse.addProduct('Food', 'waffle', 2)
            warehouse.addProduct('Drink', 'juice', 7)
            let result = warehouse.occupiedCapacity()
            assert.equal(result, 9)
        })

        it('if there are no products', () => {
            let result = warehouse.occupiedCapacity()
            assert.equal(result, 0)
        })
    })

    describe('test revision()', () => {
        // it('if there are only products of type Food', () => {
        //     warehouse.addProduct('Food', 'pizza', 1)
        //     warehouse.addProduct('Food', 'apple', 2)
        //     warehouse.addProduct('Food', 'banana', 3)
        //     let result = warehouse.revision()
        //     let expected = `Product type - [Food]\n- pizza 1\n- apple 2\n- banana 3\nProduct type - [Drink]`
        //     assert.equal(result, expected)
        // })
        // 
        // it('if there are only products of type Drink', () => {
        //     warehouse.addProduct('Drink', 'tea', 1)
        //     warehouse.addProduct('Drink', 'beer', 2)
        //     warehouse.addProduct('Drink', 'juice', 3)
        //     let result = warehouse.revision()
        //     let expected = `Product type - [Food]\nProduct type - [Drink]\n- tea 1\n- beer 2\n- juice 3`
        //     assert.equal(result, expected)
        // })

        it('if there are products of both type', () => {
            warehouse.addProduct('Drink', 'tea', 1)
            warehouse.addProduct('Drink', 'beer', 2)
            warehouse.addProduct('Drink', 'juice', 3)
            warehouse.addProduct('Food', 'banana', 3)
            let result = warehouse.revision()
            let expected = `Product type - [Food]\n- banana 3\nProduct type - [Drink]\n- tea 1\n- beer 2\n- juice 3`
            assert.equal(result, expected)
        })

        it('if there are no products', () => {
            let result = warehouse.revision()
            let expected = `The warehouse is empty`
            assert.equal(result, expected)
        })
    })

    describe('test scrapeAProduct()', () => {
        it('if more products are added && the quantity is < available quantity', () => {
            warehouse.addProduct('Drink', 'tea', 6)
            warehouse.addProduct('Drink', 'water', 1)
            // let result = JSON.stringify(warehouse.scrapeAProduct('tea', 2))
            warehouse.scrapeAProduct('tea', 2)
            assert.equal(warehouse.availableProducts.Drink.tea, 4)
        })

        it('if the product is added && the quantity is > available quantity', () => {
            warehouse.addProduct('Drink', 'tea', 6)
            let result = JSON.stringify(warehouse.scrapeAProduct('tea', 10))
            assert.equal(result, '{"tea":0}')
        })

        it('if the product is not added yet', () => {
            let result = () => { warehouse.scrapeAProduct('tea', 10) }
            assert.throw(result, `tea do not exists`)
        })
    })
})