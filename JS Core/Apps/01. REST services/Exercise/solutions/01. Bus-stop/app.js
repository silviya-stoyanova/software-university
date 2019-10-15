function getInfo() {
    function showBusStop(name) {
        document.getElementById('stopName').textContent = name
    }

    function showBuses(buses) {
        clearChildren('li')

        Object.entries(buses)
            .map(bus => {
                let li = document.createElement('li')
                li.textContent = `Bus ${bus[0]} arrives in ${bus[1]} minutes`
                document.getElementById('buses').append(li)
            })
    }

    function clearChildren(type) {
        document.querySelectorAll('li')
            .forEach(el => {
                el.parentNode.removeChild(el)
            })
    }

    function showErr(err) {
        clearChildren('li')
        document.getElementById('stopName').textContent = 'Error'
    }

    let stopId = document.getElementById('stopId').value
    let url = `https://judgetests.firebaseio.com/businfo/${stopId}.json`

    fetch(url)
        .then(response => response.json())
        .then(res => {
            showBusStop(res.name)
            showBuses(res.buses)
        })
        .catch(res => showErr())
}