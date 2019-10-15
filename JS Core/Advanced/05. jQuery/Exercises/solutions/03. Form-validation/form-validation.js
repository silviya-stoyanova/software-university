function validate() {
    let $companyElement = $('#company').on('change', showAndHideCompanyInfo)
    $('#submit').on('click', submit)

    function showAndHideCompanyInfo() {
        let $companyInfoElement = $('#companyInfo')

        if ($companyElement[0].checked) {
            $companyInfoElement.attr('style', 'visibility: visible')
        } else {
            $companyInfoElement.attr('style', 'display: none')
        }
    }

    function submit(event) {
        event.preventDefault()
        event.stopPropagation()

        let $usernameElement = $('#username')
        let $emailElement = $('#email')
        let $passwordElement = $('#password')
        let $confirmPasswordElement = $('#confirm-password')
        let $companyNumberElement = $('#companyNumber')

        if (!$usernameElement.val().match(/^[A-Za-z0-9]{3,20}$/)) {
            $usernameElement.attr('style', 'border-color: red')
        } else {
            $usernameElement.attr('style', 'border: none')
        }

        if (!$emailElement.val().match(/@(.+|\.)*\.+/)) {
            $emailElement.attr('style', 'border-color: red')
        } else {
            $emailElement.attr('style', 'border: none')
        }

        if (!$passwordElement.val().match(/.{5,15}/)) {
            $passwordElement.attr('style', 'border-color: red')
        } else {
            $passwordElement.attr('style', 'border: none')
        }

        if (!$confirmPasswordElement.val().match(new RegExp(`^${$passwordElement.val()}$`))
            || $confirmPasswordElement.val().length < 5) {

            $confirmPasswordElement.attr('style', 'border-color: red')
        } else {
            $confirmPasswordElement.attr('style', 'border: none')
        }

        if ($companyElement[0].checked) {
            if (Number($companyNumberElement.val()) < 1000 || Number($companyNumberElement.val()) > 9999) {
                $companyNumberElement.attr('style', 'border-color: red')
            } else {
                $companyNumberElement.attr('style', 'border: none')
            }
        }

        if ($('#wrapper [style="border-color: red"]').length > 0) {
            $('#valid').attr('style', 'display: none')
        } else {
            $('#valid').attr('style', 'visibility: visible')
        }
    }
}
