function sortList() {
    let numbers = []
    let initialSize = numbers.length

    return {
        size: initialSize,

        add: function (elemenent) {
            numbers.push(elemenent)
            numbers.sort((a, b) => a - b)
            initialSize++
            this.size = initialSize
            return numbers
        },

        remove: function(index) {
            if (numbers.length === 0 || index < 0 || index >= numbers.length) {
                throw new Error('Wrong index!')
            }
            numbers.splice(index, 1)
            numbers.sort((a, b) => a - b)
            initialSize--
            this.size = initialSize
        },

        get: function (index) {
            if (index < 0 || index > numbers.length) {
                throw new Error('Wrong index!')
            }
            return numbers[index]
        },
    }
}

let myList = sortList();
console.log(myList.add(5))     // 5
console.log(myList.add(3))     // 3 5
console.log(myList.add(3))     // 3 3 5
console.log(myList.add(3))     // 3 3 3 5
console.log(myList.add(3))     // 3 3 3 5
// myList.remove(0)
// console.log(myList)
console.log(myList.size)       // 2