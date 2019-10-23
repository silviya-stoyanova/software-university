const fs = require('fs')
const path = require('path')
const myDatabasePath = path.join(__dirname, '/myDatabase.json')
let fileExists = fs.existsSync(myDatabasePath)

module.exports = {
    add: (movie) => {   // receive an object

        fs.exists(myDatabasePath, (exists) => {
            if (!exists) {
                fs.writeFile(myDatabasePath, '[]', (err) => {
                    if (err) {
                        console.error(err)
                    }
                })
            }

            fs.readFile(myDatabasePath, (err, data) => {
                if (err) {
                    return console.error(err)
                }

                data = JSON.parse(data)
                movie.id = data.length + 1
                data.push(movie)
                data = JSON.stringify(data)

                fs.writeFile(myDatabasePath, data, (err) => {
                    if (err) {
                        return console.error(err)
                    }
                })
            })
        })
    },

    getAll: () => {
        let allMovies = 'laa'

        if (fileExists) {
            allMovies = fs.readFileSync(myDatabasePath)
            allMovies = JSON.parse(allMovies)
            return allMovies

        } else {
            fs.writeFileSync(myDatabasePath, '[]')
            allMovies = []
            return allMovies
        }
    },

    getMovie: (movieId) => {
        let movie = 'laa'

        if (fileExists) {
            let allMovies = fs.readFileSync(myDatabasePath).toString()
            allMovies = JSON.parse(allMovies)
            movie = allMovies.filter(m => m.id.toString() === movieId)
            return movie[0]

        } else {
            fs.writeFileSync(myDatabasePath, '[]')
            movie = []
            return movie
        }
    }
}