const Cube = require('../models/Cube')

async function getHome(req, res) {
    // implement the search here
    // get the info from the query
    let search = req.query.search
    let minDifficulty = Number(req.query.from)
    let maxDifficulty = Number(req.query.to)

    let cubes = await Cube.find()
    // filter the cubes here
    if (search) {
        cubes = cubes.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (minDifficulty) {
        cubes = cubes.filter(c => c.difficulty >= minDifficulty)
    }

    if (maxDifficulty) {
        cubes = cubes.filter(c => c.difficulty <= maxDifficulty)
    }

    cubes.sort((a, b) => a.difficulty - b.difficulty)
    res.render('index.hbs', { cubes })
}

module.exports = {
    getHome
}