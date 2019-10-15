import { Suite } from "mocha";

function printDeckOfCards(cards) {
    let deckOfCards = []

    for (let card of cards) {
        let suit = card.slice(card.length - 1, card.length)
        let face = card.slice(0, card.indexOf(suit))
        let newCard = makeCard(face, suit)
        deckOfCards.push(newCard)
    }

    function makeCard(face, suit) {
        let cardFaces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
        let cardSuits = {
            S: '\u2660',
            H: '\u2665',
            D: '\u2666',
            C: '\u2663'
        }

        if (!cardFaces.includes(face) || !cardSuits.hasOwnProperty(suit)) {
            // let exception = new Error
            // exception.card = face + suit
            // throw exception
            console.log(`Invalid card: ${face + suit}`);
        }

        let Card = {
            face,
            suit: cardSuits[suit],
            toString: function () {
                return this.face + this.suit
            }
        }

        return Card
    }

    console.log(deckOfCards.join(' '))
    // return deckOfCards.join(' ')
}

// try {
//     console.log(printDeckOfCards(['AS', '10D', 'KH', '2C']))
//     console.log(printDeckOfCards(['5S', '3D', 'QD', '1C']))
// 
// } catch (exception) {
//     console.log(`Invalid card: ${exception.card}`);
// }