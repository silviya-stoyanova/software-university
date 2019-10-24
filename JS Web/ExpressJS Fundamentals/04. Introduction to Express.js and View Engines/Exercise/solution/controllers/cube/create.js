const Cube = require('../../models/Cube')
const alert = require('alert-node')

function getCreate(req, res) {
    res.render('create.hbs')
}

async function postCreate(req, res) {
    let data = req.body

    if (data.name.length < 3 || data.name.length > 15) {
        alert('Name must be between 3 and 15 symbols!')

        // Name: 'Name must be between 3 and 15 symbols!'
        // Description: 'Description must be between 20 and 300 symbols'
        // Image URL: 'Image URL must start with https://' or 'Image URL must end with .jpg or .png'

    } else if (data.description.length < 20 || data.description.length > 300) {
        alert('Description must be between 20 and 300 symbols!')

    } else if (data.imageUrl.length < 20 || data.imageUrl.length > 300) {
        alert('Image URL must start with https:// and end with .jpg or .png!')

    } else {
        await new Cube(data).save()
        res.redirect('/')
    }
}

module.exports = {
    getCreate,
    postCreate
}