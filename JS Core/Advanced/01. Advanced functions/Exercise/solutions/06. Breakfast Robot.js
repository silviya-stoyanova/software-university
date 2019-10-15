function solve() {      //  <<<--- FOR JUDGE ONLY <<<--- //
    // YOU MUST ENCAPSULATE THE SOLUTION 
    // IN ANOTHER FUNCTION IN ORDER TO PASS JUDGE TESTS

    let solution = (() => {
        let products = {
            protein: 0,
            carbohydrate: 0,
            fat: 0,
            flavour: 0
        }

        let meals = {
            apple: { carbohydrate: 1, flavour: 2 },
            coke: { carbohydrate: 10, flavour: 20 },
            burger: { carbohydrate: 5, fat: 7, flavour: 3 },
            omelet: { protein: 5, fat: 1, flavour: 1 },
            cheverme: { protein: 10, carbohydrate: 10, fat: 10, flavour: 10 },
        }

        let prepareMeal = (mealType, purchasedQuantity) => {
            let productsPerMealObj = meals[mealType]
            let enoughProducts = true

            let neededProducts = Object.entries(productsPerMealObj)
            for (let [neededProduct, neededQuantity] of neededProducts) {
                neededQuantity *= purchasedQuantity

                // iterate through all products
                let allProducts = Object.entries(products)
                for (let [availableProduct, availableQuantity] of allProducts) {
                    if (neededProduct === availableProduct) {

                        if (neededQuantity <= availableQuantity) {
                            availableQuantity -= neededQuantity
                            products[availableProduct] = availableQuantity

                        } else {
                            enoughProducts = false
                            return `Error: not enough ${neededProduct} in stock`
                        }
                    }
                }
            }

            if (enoughProducts) {
                return `Success`
            }
        }

        // тази функция приема входните данни и ги обработва, а
        // най-горната (manager) е самоизвикваща се, която връща тази 
        return function (input) {
            input = input.split(' ')
            let command = input[0]
            let purchasedQuantity = input[2]

            if (command === 'restock') {
                let microelement = input[1]
                products[microelement] += Number(purchasedQuantity)
                return `Success`  // for judge return 

            } else if (command === 'prepare') {
                let mealType = input[1]
                return prepareMeal(mealType, purchasedQuantity)

            } else if (command === 'report') {
                return `protein=${products.protein} carbohydrate=${products.carbohydrate} fat=${products.fat} flavour=${products.flavour}`
            }
        }
    })()
}
console.log(solution('restock carbohydrate 10'))
console.log(solution('restock flavour 10'))
console.log(solution('prepare apple 1'))
console.log(solution('restock fat 10'))
console.log(solution('prepare burger 1'))
console.log(solution('report'))