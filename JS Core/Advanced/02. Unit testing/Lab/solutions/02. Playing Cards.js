function makeCard(face, suit) {
    let cardFaces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
    let cardSuits = {
        S: '\u2660',
        H: '\u2665',
        D: '\u2666',
        C: '\u2663'
    }

    if (!cardFaces.includes(face)) {
        throw new Error('Invalid card face!')
    }

    if (!cardSuits.hasOwnProperty(suit)) {
        throw new Error('Invalid card suit!')
    }

    let Card = {
        face: face,
        suit: cardSuits[suit],
        toString: function () {
            return this.face + this.suit
        }
    }

    return Card
}

let newCard = makeCard('2', 'C')
console.log(newCard.toString());


console.log('' + makeCard('A', 'S'));
console.log('' + makeCard('10', 'H'));
console.log('' + makeCard('1', 'C'));