function solve() {
    const result = (function () {
        let validFaces = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
        let Suits = {
            SPADES: '♠',
            HEARTS: '♥',
            DIAMONDS: '♦',
            CLUBS: '♣'
        }

        class Card {
            constructor(face, suit) {
                this._face = face
                this._suit = suit
            }

            get face() {
                return this._face
            }
            set face(face) {
                if (validFaces.includes(face)) {
                    return this._face = face
                } else {
                    throw new Error('Wrong card face passed!')
                }
            }

            get suit() {
                return this._suit
            }
            set suit(suit) {
                ////////////
                if (suit !== undefined) {
                    return this._suit = suit
                } else {
                    throw new Error('Wrong card suit passed!')
                }
            }
        }

        return {
            Suits: Suits,
            Card: Card
        }
    })()

    let Card = result.Card
    let Suits = result.Suits

    let card = new Card
    card.face = 'A'
    card.suit = Suits.DIAMONDS
    let card2 = new Card('1', Suits.DIAMONDS)   // Error

    console.log(card);
    console.log(card2);
}
solve()