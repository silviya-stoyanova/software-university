class Sumator {
    constructor() {
        this.data = [];
    }

    add(item) {
        this.data.push(item);
    }

    sumNums() {
        let sum = 0;
        for (let item of this.data)
            if (typeof (item) === 'number')
                sum += item;
        return sum;
    }

    removeByFilter(filterFunc) {
        this.data = this.data.filter(x => !filterFunc(x));

        // let filterFunc = (x) => x % 2 === 0 //*same
    }

    toString() {
        if (this.data.length > 0)
            return this.data.join(", ");
        else
            return '(empty)';
    }
}

module.exports = Sumator

let sumator = new Sumator

sumator.add(122)
sumator.add([36, 1, 2])
sumator.add(10)

let filterFunc = (x) => {
    // x = x.toString()    // така презаписвам ли стойността ?? Не. :)
    return typeof x === 'number'
}

sumator.removeByFilter(filterFunc)
let result = sumator.toString()

console.log(sumator);
