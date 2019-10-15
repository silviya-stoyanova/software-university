function attachEventsListeners() {
    $('main div').on('click', 'input:eq(1)', onButtonClick)

    function onButtonClick(e) {
        let buttonID = e.target.id
        let time = ''
        let result = { days: 0, hours: 0, minutes: 0, seconds: 0 }

        if (buttonID === 'daysBtn') {
            time = Number($('#days').val())
            result.days = time
            result.hours = time * 24
            result.minutes = time * 24 * 60
            result.seconds = time * 24 * 60 * 60

        } else if (buttonID === 'hoursBtn') {
            time = Number($('#hours').val())
            result.days = time / 24
            result.hours = time
            result.minutes = time * 24 * 60
            result.seconds = time * 24 * 60 * 60

        } else if (buttonID === 'minutesBtn') {
            time = Number($('#minutes').val())
            result.days = time / 24
            result.hours = time / 24 / 60
            result.minutes = time
            result.minutes = time
            result.seconds = time * 24 * 60 * 60

        } else if (buttonID === 'secondsBtn') {
            time = Number($('#seconds').val())
            result.days = time / 24
            result.hours = time / 24 / 60
            result.minutes = time / 24 / 60 / 60
            result.seconds = time
        }

        $('#days').val(result.days)
        $('#hours').val(result.hours)
        $('#minutes').val(result.minutes)
        $('#seconds').val(result.seconds)
    }
    //    let inputID = ''
    //
    //    if (buttonID === 'daysBtn') {
    //        inputID = 'days'
    //    } else if (buttonID === 'hoursBtn') {
    //        inputID = 'hours'
    //    } else if (buttonID === 'minutesBtn') {
    //        inputID = 'minutes'
    //    } else if (buttonID === 'secondsBtn') {
    //        inputID = 'seconds'
    //    }
    //    let input = Number($(inputID).val())
}