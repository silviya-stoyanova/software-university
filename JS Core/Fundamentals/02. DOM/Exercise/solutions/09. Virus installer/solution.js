function solve() {
    //TO DO
    let nextButton = document.getElementsByTagName('button')[0]
    nextButton.onclick = showNext
    let cancelButton = document.getElementsByTagName('button')[1]
    cancelButton.onclick = clearAll

    let contentElement = document.getElementById('content')
    let virusStatus = 1
    let agreeCheck

    function showNext() {
        if (virusStatus === 1) {
            virusStatus++
            contentElement.setAttribute('style', 'background-image: none')
            document.getElementById('firstStep')
                .setAttribute('style', 'display: block')

        } else if (virusStatus === 2) {
            let radioElements = [...document.getElementsByName('license')]
                .map(radio => radio.checked ? agreeCheck = radio.value : null)

            if (agreeCheck === 'agree') {
                virusStatus++
                document.getElementById('firstStep')
                    .setAttribute('style', 'display: none')
                document.getElementById('secondStep')
                    .setAttribute('style', 'display: block')
                nextButton.setAttribute('style', 'display: none')

                setTimeout(() => {
                    nextButton.setAttribute('style', 'display: inline-block')
                }, 3000);
            }

        } else if (virusStatus === 3) {
            document.getElementById('secondStep')
                .setAttribute('style', 'display: none')
            document.getElementById('thirdStep')
                .setAttribute('style', 'display: block')

            nextButton.setAttribute('style', 'display: none')
            cancelButton.textContent = 'Finish'
        }
    }

    function clearAll() {
        virusStatus = 0
        document.getElementById('exercise').setAttribute('style', 'display: none')
    }
}