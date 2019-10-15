function loadRepos() {
    let request = new XMLHttpRequest()

    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status >= 200 && this.status < 300) {
            $('#res').text(this.responseText)
        }
    }

    let url = 'https://api.github.com/users/testnakov/repos'
    request.open('GET', url, true)
    request.send()
}