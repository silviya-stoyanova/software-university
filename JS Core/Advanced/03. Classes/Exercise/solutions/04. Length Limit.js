class Stringer {
    constructor(string, length) {
        this.initialString = string
        this.innerString = string
        this.innerLength = length
    }

    increase(length) {
        this.innerLength += length
    }

    decrease(length) {
        this.innerLength -= length

        if (this.innerLength < 0) {
            this.innerLength = 0
        }
    }

    toString() {
        if (this.innerString.length > this.innerLength) {
            this.innerString = this.innerString.slice(0, this.innerLength)
            return this.innerString + '...'

        } else if (this.innerString.length + 1 < this.innerLength) {
            this.innerString = this.initialString.slice(this.innerString.length, this.innerLength)
            // this.innerString.length - 1, this.innerLength - 1
            return this.innerString
        }

        return this.innerString
    }
}

let test = new Stringer("Test", 5);
console.log(test.toString()); //Test

test.decrease(3);
console.log(test.toString()); //Te...

test.decrease(5);
console.log(test.toString()); //...

test.increase(4);
console.log(test.toString()); //Test