const mongoose = require('mongoose')
const Tag = require('../models/TagSchema')

module.exports = (req, res) => {

  if (req.pathname === '/generateTag' && req.method === 'POST') {
    let name = ''

    // read the data from the field. Кирилицата не се поддържа тук.
    req.on('data', function (data) {
      console.log(name)
      name += data.toString().split('=')[1]
      console.log(name)
    })

    req.on('end', function () {
      new Tag({ tagName: name }).save()

      res.writeHead(302, { 'Location': '/' })
      res.end()
    })


  } else {
    return true
  }
}