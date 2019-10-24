const Cube = require('../../models/Cube')

async function getDetails(req, res) {
    let id = req.params.id
    let cube = await Cube.findById(id)
    res.render('details.hbs', { cube })
}

module.exports = {
    getDetails
}