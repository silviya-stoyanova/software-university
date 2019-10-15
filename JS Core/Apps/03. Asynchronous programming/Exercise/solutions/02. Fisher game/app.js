function attachEvents() {
    document.getElementsByClassName('load')[0].onclick = getAllCatches
    document.getElementsByClassName('add')[0].onclick = createCatch
}

function getAllCatches() {
    let url = 'https://fisher-game.firebaseio.com/catches.json'

    document.getElementById('catches').innerHTML = ''

    fetch(url)
        .then(res => res.json())
        .then(function (catches) {

            Object.entries(catches).map((c) => {

                let catchDiv = document.createElement('div')
                catchDiv.setAttribute('data-id', c[0])
                catchDiv.classList.add('catch')

                catchDiv.innerHTML = `<label>Angler</label>
                    <input type="text" class="angler" value="${c[1].angler}" />
                    <hr>
                    <label>Weight</label>
                    <input type="number" class="weight" value="${c[1].weight}" />
                    <hr>
                    <label>Species</label>
                    <input type="text" class="species" value="${c[1].species}" />
                    <hr>
                    <label>Location</label>
                    <input type="text" class="location" value="${c[1].location}" />
                    <hr>
                    <label>Bait</label>
                    <input type="text" class="bait" value="${c[1].bait}" />
                    <hr>
                    <label>Capture Time</label>
                    <input type="number" class="captureTime" value="${c[1].captureTime}" />
                    <hr>
                    <button class="update" onclick="updateCatch('${c[0]}')">Update</button>
                    <button class="delete" onclick="delCatch('${c[0]}')">Delete</button>`

                document.getElementById('catches').appendChild(catchDiv)
            })
        })
}

function createCatch() {
    let url = 'https://fisher-game.firebaseio.com/catches.json'

    let angler = document.querySelector('#addForm input.angler').value
    let weight = document.querySelector('#addForm input.weight').value
    let species = document.querySelector('#addForm input.species').value
    let location = document.querySelector('#addForm input.location').value
    let bait = document.querySelector('#addForm input.bait').value
    let captureTime = document.querySelector('#addForm input.captureTime').value

    if (angler && weight && species && location && bait && captureTime) {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({ angler, weight, species, location, bait, captureTime })

        }).then(function () {
            document.querySelector('#addForm input.angler').value = ''
            document.querySelector('#addForm input.weight').value = ''
            document.querySelector('#addForm input.species').value = ''
            document.querySelector('#addForm input.location').value = ''
            document.querySelector('#addForm input.bait').value = ''
            document.querySelector('#addForm input.captureTime').value = ''
            getAllCatches()
        })
    }
}

function updateCatch(catchId) {
    let url = `https://fisher-game.firebaseio.com/catches/${catchId}.json/`

    let catchElement = `#catches div[data-id="${catchId}"]`

    let angler = document.querySelector(catchElement + ' input.angler').value
    let weight = document.querySelector(catchElement + ' input.weight').value
    let species = document.querySelector(catchElement + ' input.species').value
    let location = document.querySelector(catchElement + ' input.location').value
    let bait = document.querySelector(catchElement + ' input.bait').value
    let captureTime = document.querySelector(catchElement + ' input.captureTime').value

    if (angler && weight && species && location && bait && captureTime) {
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify({ angler, weight, species, location, bait, captureTime })

        }).then(function () {
            document.querySelector(catchElement + ' input.angler').value = ''
            document.querySelector(catchElement + ' input.weight').value = ''
            document.querySelector(catchElement + ' input.species').value = ''
            document.querySelector(catchElement + ' input.location').value = ''
            document.querySelector(catchElement + ' input.bait').value = ''
            document.querySelector(catchElement + ' input.captureTime').value = ''
            getAllCatches()
        })
    }
}

function delCatch(catchId) {
    let url = `https://fisher-game.firebaseio.com/catches/${catchId}.json/`

    fetch(url, {
        method: 'DELETE'

    }).then(function () {
        getAllCatches()
    })
}

attachEvents();