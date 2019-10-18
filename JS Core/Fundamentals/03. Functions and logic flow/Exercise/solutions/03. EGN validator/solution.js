function validate() {
    // TO DO:
    document.getElementsByTagName('button')[0]
        .addEventListener('click', createEGN)

    function createEGN() {
        let egn = ''

        let year = Number(document.getElementById('year').value)
        let validYear = false
        year >= 1900 ? (year <= 2100 ? validYear = true : validYear = false) : validYear = false

        if (validYear) {
            year = year.toString()
            egn += year[2]
            egn += year[3]
        }

        let monthIndex = document.querySelector('#month')
        monthIndex = monthIndex.options.selectedIndex
        monthIndex < 10 ? monthIndex = `0${monthIndex}` : monthIndex = monthIndex
        egn += monthIndex

        let date = Number(document.getElementById('date').value)
        date < 10 ? date = `0${date}` : date = date
        egn += date

        // the next 3 digits depend on both gender and region
        let gender
        document.getElementById('male').checked ? gender = 'male' : gender = 'female'

        let validRegion = false
        let region = document.getElementById('region').value
        Number(region) >= 43 ? (Number(region) <= 999 ? validRegion = true : validRegion = false) : validRegion = false

        if (validRegion) {
            if (region.length === 2) {
                gender === 'male' ? region += 1 : region += 2

            } else {
                region = +region + 1     //////// ??

                if (gender === 'male') {
                    region % 2 === 0 ? region = region : region += 1

                } else if (gender === 'female') {
                    region % 2 === 1 ? region = region : region += 1
                }

                egn += region
            }
        }

        let egnNumsSum = 2 + 4 + 8 + 5 + 10 + 9 + 7 + 3 + 6

        for (let num of egn) {
            egnNumsSum += Number(num)
        }

        let reminder = egnNumsSum % 11
        reminder === 10 ? reminder = 0 : reminder = reminder
        egn += reminder

        document.getElementById('egn').textContent =
            `Your EGN is ${egn}`

        clearFields()
    }

    function clearFields() {
        document.getElementById('year').textContent = ''
        document.getElementById('month').options.selectedIndex = 0
        document.getElementById('date').textContent = ''
        document.getElementById('male').checked = false
        document.getElementById('female').checked = false
        document.getElementById('region').textContent = ''
    }
}