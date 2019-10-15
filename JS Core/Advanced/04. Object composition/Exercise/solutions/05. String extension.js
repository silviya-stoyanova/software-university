let stringExtension = (function () {
    String.prototype.ensureStart = function (str) {
        if (!this.startsWith(str)) {
            return str + this.toString()
        } else {
            return this.toString()
        }
    }

    String.prototype.ensureEnd = function (str) {
        if (!this.endsWith(str)) {
            return this.toString() + str
        } else {
            return this.toString()
        }
    }

    String.prototype.isEmpty = function () {
        if (this.length === 0) {
            return true
        } else {
            return false
        }
    }

    String.prototype.truncate = function (desiredLength) {
        if (this.length <= desiredLength) {
            return this.toString()
        } else {
            if (this.includes(' ')) {
                let inputArr = this.split(' ')

                while ((inputArr.join(' ') + '...').length > desiredLength) {
                    inputArr.pop()
                }
                return inputArr.join(' ') + '...'

            } else {
                if (this.length > 4) {
                    return this.slice(0, desiredLength - 3) + '...'
                } else {
                    return '.'.repeat(desiredLength)
                }
            }
        }
    }

    String.format = function (text, ...params) { //static
        let template = /{\d+}/g // g ?
        text = text.split(' ')

        for (let i = 0; i < text.length; i++) {
            let word = text[i]

            if (params.length > 0) {
                if (word.match(template)) {
                    text[i] = params.shift()
                }
            }
        }
        return text.join(' ')
    }
})()

let str = 'the quick brown fox jumps over the lazy dog'
console.log(str.truncate(12));

// let str = 'my string'
// str = str.ensureStart('my')
// console.log(str);
// str = str.ensureStart('hello ')
// console.log(str);
// str = str.truncate(16)
// console.log(str);
// str = str.truncate(14)
// console.log(str);
// str = str.truncate(8)
// console.log(str);
// str = str.truncate(4)
// console.log(str);
// str = str.truncate(2)
// console.log(str);