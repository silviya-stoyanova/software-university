class Vacationer {
    constructor(fullName, creditCard = [1111, '', 111]) {
        this.fullName = fullName
        this.creditCard = this.addCreditCardInfo(creditCard)
        this.wishList = []
        this.idNumber = this.generateIDNumber()
    }

    get fullName() {
        return this._fullName
    }

    set fullName(name) {
        if (name.length !== 3) {
            throw new Error('Name must include first name, middle name and last name')
        }

        let pattern = /^[A-Z][a-z]+ [A-Z][a-z]+ [A-Z][a-z]+$/

        if (!(name.join(' ').match(pattern))) {
            throw new Error('Invalid full name')
        }

        this._fullName = {
            firstName: name[0],
            middleName: name[1],
            lastName: name[2]
        }
    }

    generateIDNumber() {
        let firstLetterAscii = this.fullName.firstName.charCodeAt(0)
        let middleNameLength = this.fullName.middleName.length

        let lastLetter = this.fullName.lastName[this.fullName.lastName.length - 1]
        let lastLetterPattern = /[aeoiu]/
        let lastLetterVowel = lastLetterPattern.test(lastLetter)

        let id = 231 * firstLetterAscii + 139 * middleNameLength
        lastLetterVowel ? id += '8' : id += '7'

        return id
    }

    addCreditCardInfo(input) {
        if (input.length !== 3) {
            throw new Error('Missing credit card information')
        }

        let [cardNumber, expirationDate, securityNumber] = input

        if (typeof cardNumber !== 'number' || typeof securityNumber !== 'number') {
            throw new Error('Invalid credit card details')
        }

        return this.creditCard = {
            cardNumber: cardNumber,
            expirationDate: expirationDate,
            securityNumber: securityNumber
        }
    }

    addDestinationToWishList(destination) {
        if (this.wishList.includes(destination)) {
            throw new Error('Destination already exists in wishlist')
        }

        this.wishList.push(destination)
        this.wishList.sort((a, b) => a.length - b.length)
    }

    getVacationerInfo() {
        let output = `Name: ${this.fullName.firstName} ${this.fullName.middleName} ${this.fullName.lastName}\n`
        output += `ID Number: ${this.idNumber}\n`
        output += `Wishlist:\n`

        this.wishList.length
            ? output += `${this.wishList.join(', ')}\n`
            : output += `empty\n`

        output += `Credit Card:\n`
        output += `Card Number: ${this.creditCard.cardNumber}\n`
        output += `Expiration Date: ${this.creditCard.expirationDate}\n`
        output += `Security Number: ${this.creditCard.securityNumber}`

        return output
    }
}


// Initialize vacationers with 2 and 3 parameters
let vacationer1 = new Vacationer(["Vania", "Ivanova", "Zhivkova"]);
let vacationer2 = new Vacationer(["Tania", "Ivanova", "Zhivkova"],
    ['123456789', "10/01/2018", 777]);

// // Should throw an error (Invalid full name)
// try {
//     let vacationer3 = new Vacationer(["Vania", "Ivanova", "ZhiVkova"]);
// } catch (err) {
//     console.log("Error: " + err.message);
// }
// 
// // Should throw an error (Missing credit card information)
// try {
//     let vacationer3 = new Vacationer(["Zdravko", "Georgiev", "Petrov"]);
//     vacationer3.addCreditCardInfo([123456789, "20/10/2018"]);
// } catch (err) {
//     console.log("Error: " + err.message);
// }

vacationer1.addDestinationToWishList('Spain');
vacationer1.addDestinationToWishList('Germany');
vacationer1.addDestinationToWishList('Bali');

// Return information about the vacationers
console.log(vacationer1.getVacationerInfo());
console.log(vacationer2.getVacationerInfo());