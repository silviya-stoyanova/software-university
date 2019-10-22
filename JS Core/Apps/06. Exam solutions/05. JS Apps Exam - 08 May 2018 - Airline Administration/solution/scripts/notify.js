const show = (() => {

    function load() {
        $(document).ajaxStart(() => {
            $('#loadingBox').show()
        })

        $(document).ajaxStop(() => {
            $('#loadingBox').fadeOut()
        })
    }

    function success(message) {
        $('#infoBox span').text(message)
        $('#infoBox')
            .css('background', 'lightgreen')
            .fadeIn()
            .on('click', function (e) {
                $(e.target).fadeOut()
            })

        setTimeout(() => {
            $('#infoBox').fadeOut()
        }, 3000)
    }

    function error(message) {
        $('#errorBox span').text(message)
        $('#errorBox')
            .css('background', 'red')
            .fadeIn()
            .click((e) => {
                $(e.target).fadeOut()
            })
    }

    function handleError(message) {
        error(message.responseJSON.description)
    }

    return {
        load,
        success,
        error,
        handleError
    }
})()