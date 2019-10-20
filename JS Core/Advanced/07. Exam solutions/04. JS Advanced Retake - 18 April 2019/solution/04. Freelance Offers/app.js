// function solve() { // for Judge
$('#loginBtn').on('click', onLogBtnClick)
logOtUser()

function onLogBtnClick(e) {
    e.preventDefault()
    let logBtn = $('#loginBtn')

    if (logBtn.text() === 'Login') {
        logInUser()

    } else {
        logBtn.text('Login')
        logOtUser()
    }
}

function logInUser() {
    let usernameEl = $('#username')
    let username = usernameEl.val()

    if (username.length >= 4 && username.length <= 10) {
        $('#create-offers').css('display', 'block')

        usernameEl.addClass('border-0 bg-light')
        usernameEl.attr('disabled', true)
        usernameEl.val(`Hello, ${username}!`)
        $('#loginBtn').text('Logout')
        $('#notification').text('')

        $('#create-offer-Btn').on('click', createOffer)

    } else {
        $('#notification').text("The username length should be between 4 and 10 characters.")
    }
}

function logOtUser() {
    $('#create-offers').css('display', 'none')

    let usernameEl = $('#username')
    usernameEl.removeClass('border-0 bg-light')
    usernameEl.attr('disabled', false)
    usernameEl.val('')
}

function createOffer(e) {
    e.preventDefault()
    let offerName = $('#offerName').val()
    let company = $('#company').val()
    let description = $('#description').val()

    if (offerName && company && description) {
        let bigDiv = $('<div>')
        let cardWrapperDiv = $('<div>')

        let cardHeader = $('<div>').text(offerName)

        let cardBody = $('<div>')
        let cardTitle = $('<h5>')
        let cardText = $('<p>')

        cardBody
            .append(cardTitle.text(company).addClass('card-title'))
            .append(cardText.text(description).addClass('card-text'))

        cardWrapperDiv
            .addClass('card text-white bg-dark mb-3 pb-3')
            .attr('style', 'max-width: 18rem;')
            .append(cardHeader.addClass('card-header'))
            .append(cardBody.addClass('card-body'))
            .appendTo(bigDiv.addClass('col-3'))

        bigDiv.appendTo($('#offers-container'))
    }
    $('#offerName').val('')
    $('#company').val('')
    $('#description').val('')
}
// }