function toggle() {
    if ($('.button').text() === 'More') {
        $('#extra').css('display', 'block')
        $('.button').text('Less')
    } else {
        $('#extra').css('display', 'none')
        $('.button').text('More')
    }
}
