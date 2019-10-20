function leapYear() {
    document.getElementsByTagName('button')[0]
        .addEventListener('click', checkYearType)

    function checkYearType() {
        let yearElement = document.querySelector('#exercise input')
        let year = Number(yearElement.value)
        let yearType = ''

        if (year % 4 === 0) {
            yearType = 'Leap Year'
            if (year % 100 === 0) {
                yearType = 'Not Leap Year'
                if (year % 400 === 0) {
                    yearType = 'Leap Year'
                }
            }
        } else {
            yearType = 'Not Leap Year'
        }

        yearElement.value = ''
        document.querySelector('#year h2').textContent = yearType
        document.querySelector('#year div').textContent = year
    }
}
