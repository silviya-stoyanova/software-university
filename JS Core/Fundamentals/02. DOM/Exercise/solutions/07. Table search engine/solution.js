function solve() {
    //TO DO
    document.getElementById('searchBtn').addEventListener('click', search)
    let tableRows = [...document.getElementsByTagName('tr')]
    tableRows.shift()
    tableRows.shift()

    function search() {
        let searchFieldElement = document.getElementById('searchField')
        let searchedString = (searchFieldElement.value).toLowerCase()

        if (searchedString.length === 0) {
            return
        }

        for (let i = 0; i < tableRows.length; i++) {
            let currRowElement = tableRows[i]
            let currRowDataElements = [...currRowElement.getElementsByTagName('td')]

            for (let j = 0; j < currRowDataElements.length; j++) {
                let data = currRowDataElements[j]
                currRowElement.removeAttribute('class', 'select')

                if (data.innerText.toLowerCase().includes(searchedString)) {
                    currRowElement.setAttribute('class', 'select')
                    break
                }
            }
        }
        searchFieldElement.value = ''
    }
}