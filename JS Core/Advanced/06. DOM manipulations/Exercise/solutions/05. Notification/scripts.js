function notify(message) {
    $('#notification')
        .css('display', 'block')  // block?
        .text(message)

    $('button').click(setTimeout(() => {
        $('#notification').css('display', 'none')
    }, 2000))
}

// when the button is clicked twice or more the browser throws an error