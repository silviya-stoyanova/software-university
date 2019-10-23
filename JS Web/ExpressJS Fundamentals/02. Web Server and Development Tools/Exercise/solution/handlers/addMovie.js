const fs = require('fs')
const path = require('path')
const queryString = require('querystring')
const database = require('../config/dataBase')
const dbActions = require('../config/db-actions')

module.exports = function (req, res) {
    let filepath = path.join(__dirname + '/../', 'views/addMovie.html')   //__DIRNAME, '../views/addMovie.html'

    if (req.url === '/movies/add' && req.method === 'GET') {
        // fs.readFile(filepath, (err, data) => {
        //     if (err) {
        //         console.error(err)
        //         return
        //     }
        //
        //     res.writeHead(200, { 'Content-Type': 'text/html' })
        //     res.write(data)
        //     res.end()
        // })

        // this two lines do the same as the code above
        let addMovieHtml = fs.createReadStream(filepath)
        addMovieHtml.pipe(res)

    } else if (req.url === '/movies/add' && req.method === 'POST') {
        let movie = ''

        // get the params from the request object (stream)
        req.on('data', (data) => {
            movie += data
        })

        // todo notifications/validations
        req.on('end', () => {
            let movieObj = queryString.parse(movie)
            let notificationMsg = ''

            //! the server crashes
            //! if the picture (movieObj.moviePoster) is not a valid link
            if (movieObj.movieTitle, movieObj.movieYear, movieObj.moviePoster, movieObj.movieDescription) {
                dbActions.add(movieObj)     // asynchronous code
                notificationMsg = `
                <div id="errBox">
                <h2 id="succssesMsg">Movie Added</h2>
                </div>`

            } else {
                notificationMsg = `
                <div id="errBox">
                <h2 id="errMsg">Please fill all fields</h2>
                </div>`
            }

            let addMovieHTML = fs.readFileSync(filepath).toString()
            addMovieHTML = addMovieHTML.replace('<div id="replaceMe">{{replaceMe}}</div>', notificationMsg)
            console.log(addMovieHTML);

            //res.writeHead(200, { 'Content-Type': 'text/html' })
            res.writeHead(302, { 'Location': '/movies/all' })
            // res.write(html)
            res.end()
        })

    } else { // if the request is not handled
        return true
    }
}