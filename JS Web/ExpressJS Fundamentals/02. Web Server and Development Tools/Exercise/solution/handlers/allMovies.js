const fs = require('fs')
const path = require('path')
const dbActions = require('../config/db-actions')

module.exports = function (req, res) {
    let filepath = path.join(__dirname + '/../', 'views/viewAll.html')

    if (req.url === '/movies/all' && req.method === 'GET') {

        fs.readFile(filepath, (err, data) => {
            if (err) {
                console.error(err)
                res.writeHead(400)
                res.end()
                return
            }

            // console.log(data + ''); buffer => html

            let movies = ''
            let allMovies = dbActions.getAll()

            for (let m of allMovies) {
                movies += `
                <div class="movie">
                    <a href="/movies/details/${m.id}">
                        <img class="moviePoster" src="${m.moviePoster}" />
                    </a>
                </div>`
            }

            data = data.toString().replace('<div id="replaceMe">{{replaceMe}} </div>', movies)
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write(data)
            res.end()
        })

    } else { // if the request is not handled
        return true
    }
}