class Kitchen {
    constructor(budget) {
        this.budget = budget
        this.menu = {}       // {juice: {price: 2, products: {name: quantity}}, musaka: {price: 10, products: {}..}
        this.productsInStock = {}// {banana: 5, apple: 4...}
        this.actionsHistory = []
    }

    loadProducts(products) {
        products.forEach(meal => {
            let [productName, productQuantity, productPrice] = meal.split(' ')
            if (this.budget - Number(productPrice) >= 0) {
                if (!this.productsInStock[productName]) {
                    this.productsInStock[productName] = 0
                }
                this.productsInStock[productName] += Number(productQuantity)
                this.budget -= Number(productPrice)
                this.actionsHistory.push(`Successfully loaded ${productQuantity} ${productName}`)

            } else {
                this.actionsHistory.push(`There was not enough money to load ${productQuantity} ${productName}`)
            }
        })
        return this.actionsHistory.join('\n')
    }

    addToMenu(meal, neededProducts, price) {
        if (this.menu[meal]) {
            return `The ${meal} is already in our menu, try something different.`
        }
        this.menu[meal] = {}
        this.menu[meal].price = Number(price)
        this.menu[meal].products = {}

        neededProducts.forEach(product => {
            let [productName, productQuantity] = product.split(' ')
            this.menu[meal].products[productName] = Number(productQuantity)
        })

        return `Great idea! Now with the ${meal} we have ${Object.entries(this.menu).length} meals in the menu, other ideas?`
    }

    showTheMenu() {
        let output = ''
        if (!Object.entries(this.menu).length) {
            output = `Our menu is not ready yet, please come later...`
        }

        Object.entries(this.menu).map(meal => {
            output += `${meal[0]} - $ ${meal[1].price}\n`
        })
        return output
    }

    makeTheOrder(meal) {
        let haveAllProducts = false

        if (!this.menu[meal]) {
            return `There is not ${meal} yet in our menu, do you want to order something else?`
        } else {
            haveAllProducts = this.checkProductsAvail(meal)
        }

        if (haveAllProducts) {
            Object.entries(this.menu[meal].products).map(product => {
                let [prodName, quantity] = product
                this.productsInStock[prodName] -= quantity
            })
            this.budget += this.menu[meal].price
            return `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${this.menu[meal].price}.`

        } else {
            return `For the time being, we cannot complete your order (${meal}), we are very sorry...`
        }
    }

    checkProductsAvail(meal) {
        let haveAllProducts = true

        Object.entries(this.menu[meal].products).map(product => {
            let [prodName, quantity] = product

            if (!this.productsInStock[prodName] ||
                this.productsInStock[prodName] < quantity) {
                haveAllProducts = false
            }
        })
        return haveAllProducts
    }
}

let kitchen = new Kitchen(1000);
kitchen.loadProducts(['Banana 10 5', 'Banana 20 10',
    'Strawberries 50 30', 'Yogurt 10 10', 'Yogurt 500 1500', 'Honey 5 50'])

// kitchen.addToMenu('frozenYogurt', ['Yogurt 10', 'Honey 1', 'Banana 1', 'Strawberries 10'], 9.99)
// kitchen.addToMenu('Pizza', ['Flour 0.5', 'Oil 0.2', 'Yeast 0.5', 'Salt 0.1', 'Sugar 0.1', 'Tomato sauce 0.5', 'Pepperoni 1', 'Cheese 1.5'], 15.55)

console.log(kitchen.showTheMenu())
console.log(kitchen.makeTheOrder('Pizza'));