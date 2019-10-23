const fs = require('fs')
const path = require('path')
const dbActions = require('../config/db-actions')

module.exports = function (req, res) {
    const movieId = path.parse(req.url).name
    console.log(path.parse(req.url))

    if (req.url === `/movies/details/${movieId}` && req.method === 'GET') {
        let filePath = path.join(__dirname, '../views/details.html')

        let detailsPage = fs.createReadStream(filePath)

        let pageHTML = ''

        // todo show info
        detailsPage.on('data', (data) => {
            pageHTML += data
        })

        detailsPage.on('end', () => {
            // to show movie info here
            let movie = dbActions.getMovie(movieId)
            console.log(movieId, movie);

            let movieDetails = `
            <div class="content">
                <img class="moviePoster" src="${movie.moviePoster}" />
                <h3>Title ${movie.movieTitle}</p>
                <h3>Year ${movie.movieYear}</p>
                <p>${movie.movieDescription}</p>
            </div>`

            pageHTML = pageHTML.replace('<div id="replaceMe">{{replaceMe}}</div>', movieDetails)

            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write(pageHTML)
            res.end()
        })

        //this code here does the same:
        // detailsPage.pipe(res)







    } else { // if the request is not handled
        return true
    }
}