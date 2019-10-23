let qs = require('querystring')
const Tag = require('mongoose').model('Tag')
const Image = require('../models/ImageSchema')

const addImage = function (req, res) {
  let image = ''

  req.on('data', function (data) {
    image += data
  })

  req.on('end', function () {
    image = qs.parse(image)   // convert the ASCII chars to an object
    image.tags = image.tags.split(',').filter(x => x !== '')
    console.log(image)

    new Image(image).save().then(img => {
      let tagsIds = image.tagsID.split(',')

      tagsIds.map(tagId => {

        Tag.findById(tagId).then(tag => {
          tag.images.push(img._id)
          tag.save()
        })

      })
    })

    res.writeHead(302, { 'Location': '/' })
    res.end()
  })
}

const deleteImg = function (req, res) {
  // full path:   /delete?id=${image._id}

  let imgId = qs.parse(req.url)['/delete?id']

  Image.findByIdAndDelete(imgId)
    .then(() => {
      res.writeHead(302, { Location: '/' })
      res.end()
    })
}

module.exports = (req, res) => {
  if (req.pathname === '/addImage' && req.method === 'POST') {
    addImage(req, res)

  } else if (req.pathname === '/delete' && req.method === 'GET') {
    deleteImg(req, res)

  } else {
    return true
  }
}
