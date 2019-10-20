class Vacation {
    constructor(organizer, destination, budget) {
        this.organizer = organizer
        this.destination = destination
        this.budget = budget
        this.kids = {}
        // kids = {
        //     2: [[name, budget], [name2, budget2], [name3, budget3]],
        //     3: [[name, budget], [name2, budget2], [name3, budget3]],
        // }
    }

    registerChild(name, grade, budget) {
        if (budget >= this.budget) {
            if (!this.kids[grade]) {
                this.kids[grade] = []
            }

            let kidExists = false
            this.kids[grade].map(kid => kid[0].includes(name) ? kidExists = true : kidExists)

            if (!kidExists) {
                this.kids[grade].push([name, budget])
                return this.kids[grade].map(kid => kid.join('-'))
            } else {
                return `${name} is already in the list for this ${this.destination} vacation.`
            }
        } else {
            return `${name}'s money is not enough to go on vacation to ${this.destination}.`
        }
    }

    removeChild(name, grade) {
        let kidIndex = -1

        if (this.kids[grade]) {
            this.kids[grade].map((kid, index) => kid[0] === name ? kidIndex = index : kidIndex)
        }
        if (kidIndex > -1) {
            this.kids[grade].splice(kidIndex, 1)
            return this.kids[grade].map(kid => kid.join('-'))
        } else {
            return `We couldn't find ${name} in ${grade} grade.`
        }
    }

    toString() {
        let firstLine = ''
        let result = ''

        if (Object.entries(this.kids).length > 0) {
            let totalKids = 0

            Object.entries(this.kids).map(grade => {
                result += `Grade: ${grade[0]}\n`
                grade[1].map((kid, index) => {
                    totalKids++
                    result += `${index + 1}. ${kid.join('-')}\n`
                })
                result += `\n`
            })
            firstLine = `${this.organizer} will take ${totalKids} children on trip to ${this.destination}\n`
        } else {
            result = `No children are enrolled for the trip and the organization of ${this.organizer} falls out...`
        }
        return firstLine + result
    }

    get numberOfChildren() {
        let totalKids = 0
        Object.entries(this.kids)
            .map(grade =>
                grade[1].map(kid => totalKids++))
        return totalKids
    }
}

let vacation = new Vacation('Miss Elizabeth', 'Dubai', 2000);
vacation.registerChild('Gosho', 5, 3000);
vacation.registerChild('Lilly', 6, 1500);
vacation.registerChild('Pesho', 7, 4000);
vacation.registerChild('Tanya', 5, 5000);
vacation.registerChild('Mitko', 10, 5500)
console.log(vacation.numberOfChildren)
console.log(vacation.toString())