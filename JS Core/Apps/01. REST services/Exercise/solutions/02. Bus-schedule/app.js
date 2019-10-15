function solve() {
    let firstStop = 'depot'
    let url = `https://judgetests.firebaseio.com/schedule/${firstStop}.json`

    function depart() {
        fetch(url)
            .then(response => response.json())
            .then(res => {
                document.getElementById('info').textContent = `Next stop ${res.name}`
                document.getElementById('depart').disabled = true
                document.getElementById('arrive').disabled = false
                url = `https://judgetests.firebaseio.com/schedule/${res.next}.json`
            })
    }

    function arrive() {
        let stop = document.getElementById('info').textContent.substr(10)
        document.getElementById('info').textContent = `Arriving at ${stop}`
        document.getElementById('depart').disabled = false
        document.getElementById('arrive').disabled = true
    }

    return {
        depart,
        arrive
    };
}

let result = solve();