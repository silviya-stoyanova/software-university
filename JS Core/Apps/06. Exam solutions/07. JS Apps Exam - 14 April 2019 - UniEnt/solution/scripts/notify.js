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
        $('#successBox')
            .text(message)
            .css('background', 'lightgreen')
            .fadeIn()
            .on('click', function (e) {
                $(e.target).fadeOut()
            })

        setTimeout(() => {
            $('#successBox').fadeOut()
        }, 5000)
    }

    function error(message) {
        $('#successBox')
            .text(message)
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