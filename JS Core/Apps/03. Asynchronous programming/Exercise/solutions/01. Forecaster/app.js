function attachEvents() {
    document.getElementById('submit').addEventListener('click', showWeather)
}

function showWeather() {
    document.getElementById('forecast').style = 'block'

    let location = document.getElementById('location').value
    let code

    getLocationCode(location)
        .then(function (res) {
            code = res.find(r => r.name === location).code
        })
        .then(function () {
            showCurrConditions(code)
        })
        .then(function () {
            showUpcomingConditions(code)
        })
        .catch(function () {
            let errSpan = document.createElement('span')
            errSpan.textContent = 'Error'
            document.getElementById('forecast').prepend(errSpan)
            setTimeout(() => {
                document.querySelector('#forecast span').remove()
            }, 5000)
        })
}

function getLocationCode() {
    const url = 'https://judgetests.firebaseio.com/locations.json'

    return fetch(url, {
        method: 'GET',
    }).then(res => res.json()
    ).catch(function () {

        let errSpan = document.createElement('span')
        errSpan.textContent = 'Error'
        document.getElementById('forecast').prepend(errSpan)
        setTimeout(() => {
            document.querySelector('#forecast span').remove()
        }, 5000)
    })
}

function showCurrConditions(code) {
    let url = `https://judgetests.firebaseio.com/forecast/today/${code}.json`

    if (document.querySelector('#current div.forecast')) {
        document.querySelector('#current div.forecast').remove()
    }

    fetch(url)
        .then(res => res.json())
        .then(function (res) {
            let forecastDiv = document.createElement('div')

            let symbolSpan = document.createElement('span')
            let condSpan = document.createElement('span')

            let locationSpan = document.createElement('span')
            let degreesSpan = document.createElement('span')
            let descriptionSpan = document.createElement('span')

            forecastDiv.classList.add('forecast')
            symbolSpan.classList.add('condition')
            symbolSpan.classList.add('symbol')
            condSpan.classList.add('condition')
            locationSpan.classList.add('forecast-data')
            degreesSpan.classList.add('forecast-data')
            descriptionSpan.classList.add('forecast-data')

            symbolSpan.innerHTML = getSymbols(res.forecast.condition)
            locationSpan.innerHTML = res.name
            degreesSpan.innerHTML = res.forecast.low + getSymbols('Degrees') + '/' + res.forecast.high + getSymbols('Degrees')
            descriptionSpan.innerHTML = res.forecast.condition

            condSpan.appendChild(locationSpan)
            condSpan.appendChild(degreesSpan)
            condSpan.appendChild(descriptionSpan)

            forecastDiv.appendChild(symbolSpan)
            forecastDiv.appendChild(condSpan)

            document.getElementById('current').appendChild(forecastDiv)
        })
        .catch(function () {
            let errSpan = document.createElement('span')
            errSpan.textContent = 'Error'
            document.getElementById('forecast').prepend(errSpan)
            setTimeout(() => {
                document.querySelector('#forecast span').remove()
            }, 5000)
        })
}

function showUpcomingConditions(code) {
    let url = `https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`

    if (document.querySelector('#upcoming div.forecast-info')) {
        document.querySelector('#upcoming div.forecast-info').remove()
    }

    fetch(url)
        .then(res => res.json())
        .then(function (res) {

            let forecastDiv = document.createElement('div')
            forecastDiv.classList.add('forecast-info')

            for (let i = 0; i < 3; i++) {
                let upcomingSpan = document.createElement('span')

                let symbolSpan = document.createElement('span')
                let degreesSpan = document.createElement('span')
                let descriptionSpan = document.createElement('span')

                upcomingSpan.classList.add('upcoming')
                symbolSpan.classList.add('symbol')
                degreesSpan.classList.add('forecast-data')
                descriptionSpan.classList.add('forecast-data')

                symbolSpan.innerHTML = getSymbols(res.forecast[i].condition)
                degreesSpan.innerHTML = res.forecast[i].low + getSymbols('Degrees') + '/' + res.forecast[i].high + getSymbols('Degrees')
                descriptionSpan.innerHTML = res.forecast[i].condition

                upcomingSpan.appendChild(symbolSpan)
                upcomingSpan.appendChild(degreesSpan)
                upcomingSpan.appendChild(descriptionSpan)

                forecastDiv.appendChild(upcomingSpan)
            }

            document.getElementById('upcoming').appendChild(forecastDiv)
        })
        .catch(function () {
            let errSpan = document.createElement('span')
            errSpan.textContent = 'Error'
            document.getElementById('forecast').prepend(errSpan)
            setTimeout(() => {
                document.querySelector('#forecast span').remove()
            }, 5000)
        })
}

function getSymbols(name) {
    let symbols = {
        'Sunny': '&#x2600;',
        'Partly sunny': '&#x26C5;',
        'Overcast': '&#x2601;',
        'Rain': '&#x2614;',
        'Degrees': '&#176;'
    }

    return symbols[name]
}

attachEvents()