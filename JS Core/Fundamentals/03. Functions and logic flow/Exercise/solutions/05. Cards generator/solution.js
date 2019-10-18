function solve() {
    //TO DO...
    document.getElementsByTagName('button')[0].addEventListener('click', showCards)
    let allCards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

    function showCards() {
        let from = document.getElementById('from').value
        let to = document.getElementById('to').value
        let cardType = document.querySelector('select')
        let cardTypeText = cardType[cardType.options.selectedIndex].textContent
        let cardEmoji = cardTypeText[cardTypeText.length - 1]

        let fromIndex = allCards.indexOf(from)
        let toIndex = allCards.indexOf(to)

        for (let i = fromIndex; i <= toIndex; i++) {
            let newCardElement = document.createElement('div')
            newCardElement.setAttribute('class', 'card')

            let firstParagraphElement = document.createElement('p')
            let secondParagraphElement = document.createElement('p')
            let thirdParagraphElement = document.createElement('p')

            firstParagraphElement.textContent = cardEmoji
            secondParagraphElement.textContent = allCards[i]
            thirdParagraphElement.textContent = cardEmoji

            newCardElement.appendChild(firstParagraphElement)
            newCardElement.appendChild(secondParagraphElement)
            newCardElement.appendChild(thirdParagraphElement)

            document.getElementById('cards').appendChild(newCardElement)
        }
    }
}