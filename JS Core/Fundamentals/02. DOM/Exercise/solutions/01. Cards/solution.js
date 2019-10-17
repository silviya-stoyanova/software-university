function solve() {
    //TO DO
    let firstSpan = document.getElementsByTagName('span')[0]
    let secondSpan = document.getElementsByTagName('span')[2]

    let firstPlayerCardsElement = document.getElementById('player1Div')
    let firstPlayerCards = firstPlayerCardsElement.getElementsByTagName('img')

    let secondPlayerCardsElement = document.getElementById('player2Div')
    let secondPlayerCards = secondPlayerCardsElement.getElementsByTagName('img')

    let firstCardIndex = '-1'
    let firstCardName = 'abv'

    let secondCardIndex = '-1'
    let secondCardName = 'abv'

    let history = document.getElementById('history')

    // when you click on it:
    firstPlayerCards[0].addEventListener('click', () => { firstCardIndex = 0; changeFirstCard() })
    firstPlayerCards[1].addEventListener('click', () => { firstCardIndex = 1; changeFirstCard() })
    firstPlayerCards[2].addEventListener('click', () => { firstCardIndex = 2; changeFirstCard() })
    firstPlayerCards[3].addEventListener('click', () => { firstCardIndex = 3; changeFirstCard() })
    firstPlayerCards[4].addEventListener('click', () => { firstCardIndex = 4; changeFirstCard() })
    firstPlayerCards[5].addEventListener('click', () => { firstCardIndex = 5; changeFirstCard() })
    firstPlayerCards[6].addEventListener('click', () => { firstCardIndex = 6; changeFirstCard() })
    firstPlayerCards[7].addEventListener('click', () => { firstCardIndex = 7; changeFirstCard() })

    secondPlayerCards[0].addEventListener('click', () => { secondCardIndex = 0; changeSecondCard() })
    secondPlayerCards[1].addEventListener('click', () => { secondCardIndex = 1; changeSecondCard() })
    secondPlayerCards[2].addEventListener('click', () => { secondCardIndex = 2; changeSecondCard() })
    secondPlayerCards[3].addEventListener('click', () => { secondCardIndex = 3; changeSecondCard() })
    secondPlayerCards[4].addEventListener('click', () => { secondCardIndex = 4; changeSecondCard() })
    secondPlayerCards[5].addEventListener('click', () => { secondCardIndex = 5; changeSecondCard() })
    secondPlayerCards[6].addEventListener('click', () => { secondCardIndex = 6; changeSecondCard() })
    secondPlayerCards[7].addEventListener('click', () => { secondCardIndex = 7; changeSecondCard() })

    function changeFirstCard() {
        firstPlayerCards[firstCardIndex].setAttribute('src', 'images/whiteCard.jpg')
        firstCardName = Number(firstPlayerCards[firstCardIndex].name)
        firstSpan.innerText = firstCardName
        checkGreaterCard()
    }

    function changeSecondCard() {
        secondPlayerCards[secondCardIndex].setAttribute('src', 'images/whiteCard.jpg')
        secondCardName = Number(secondPlayerCards[secondCardIndex].name)
        secondSpan.textContent = secondCardName
        checkGreaterCard()
    }

    function checkGreaterCard() {
        // check whether a card from the upper side is chosen && a card from the lower side
        if (firstSpan.innerText.length > 0 && secondSpan.innerText.length > 0) {

            // compare their values, but what if they are equal ??????
            if (firstCardName > secondCardName) {
                firstPlayerCards[firstCardIndex].setAttribute('style', 'border: 2px solid green')
                secondPlayerCards[secondCardIndex].setAttribute('style', 'border: 2px solid darkred')
                writeHistory()

            } else if (firstCardName < secondCardName) {

                firstPlayerCards[firstCardIndex].setAttribute('style', 'border: 2px solid darkred')
                secondPlayerCards[secondCardIndex].setAttribute('style', 'border: 2px solid green')
                writeHistory()
            }
        }
    }

    function writeHistory() {
        history.innerText += `[${firstCardName} vs ${secondCardName}]`
        setTimeout(clearSpan, 2000);
    }

    function clearSpan() {
        firstSpan.innerText = ''
        secondSpan.innerText = ''
    }
}