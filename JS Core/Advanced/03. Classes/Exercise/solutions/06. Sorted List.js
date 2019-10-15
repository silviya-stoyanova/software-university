class SortedList {
    constructor() {
        this.nums = Array.from(arguments)
        this.size = this.nums.length
    }

    add(elemenent) {
        this.nums.push(elemenent)
        this.nums.sort((a, b) => a - b)
        this.size++
        return this.nums
    }

    remove(index) {
        if (this.nums.length === 0 || index < 0 || index >= this.nums.length) {
            throw new Error('Wrong index!')
        }
        this.nums.splice(index, 1)
        this.nums.sort((a, b) => a - b)
        this.size--
        return this.nums
    }

    get(index) {
        if (index < 0 || index > this.nums.length) {
            throw new Error('Wrong index!')
        }
        return this.nums[index]
    }
}

let myNums = new SortedList()
myNums.add(5);
console.log(myNums.get(0))
myNums.add(3);
console.log(myNums.get(0))
myNums.remove(0);
console.log(myNums.get(0))