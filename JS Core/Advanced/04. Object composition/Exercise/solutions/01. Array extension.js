(function solve() {
    Array.prototype.last = function () {
        return this[this.length - 1]
    }

    Array.prototype.skip = function (elementsAmount) {
        elementsAmount = Number(elementsAmount)
        if (elementsAmount > 0 || elementsAmount <= this.length) {
            let newArr = []

            for (let i = elementsAmount; i < this.length; i++) {
                newArr.push(this[i])
            }
            return newArr
        }
    }

    Array.prototype.take = function (elementsAmount) {
        elementsAmount = Number(elementsAmount)

        if (elementsAmount > 0 || elementsAmount <= this.length) {
            let newArr = []

            for (let i = 0; i < elementsAmount; i++) {
                newArr.push(this[i])
            }
            return newArr
        }
    }

    Array.prototype.sum = function () {
        let sum = 0

        for (let i = 0; i < this.length; i++) {
            let num = this[i]

            if (!Number.isNaN(num)) {
                sum += Number(num)
            }
        }
        return sum
    }

    Array.prototype.average = function () {
        let average = 0

        this.forEach(num => {
            if (!Number.isNaN(num)) {
                average += Number(num)
            }
        })
        return average = average / this.length
    }
})()

let numbers = [2, '5', 8]
console.log(numbers.take(2))