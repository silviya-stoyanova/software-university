function notify(message) {
    $('#notification')
        .css('display', 'block')  
        .text(message)

    $('button').click(setTimeout(() => {
        $('#notification').css('display', 'none')
    }, 2000))
}
