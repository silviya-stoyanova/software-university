const fs = require('fs')
const path = require('path')
const qs = require('querystring')
const Image = require('../models/ImageSchema')

module.exports = function (req, res) {

    if (req.pathname === '/search' && req.method === 'GET') {
        let filepath = path.join(__dirname, '../views/results.html')

        fs.readFile(filepath, (err, data) => {
            if (err) {
                console.log(err)
                return
            }

            req.url = req.url.slice(8)
            let search = qs.parse(req.url)
            console.log(search)

            let imagesHtml = ''

            Image.find() // { tags: search.tagName }
                .limit(Number(search.limit))
                .sort({ 'creationDate': -1 })
                .then(images => {

                    if (search.tagName) {
                        images = images.filter(img => img.tags.includes(search.tagName))
                    }

                    if (search.afterDate) {
                        images = images.filter(img => {
                            let afterDateMiliSec = new Date(search.afterDate).getTime()
                            return Number(img.creationDate) >= afterDateMiliSec
                        })
                    }

                    if (search.beforeDate) {
                        images = images.filter(img => {
                            let beforeDateMiliSec = new Date(search.beforeDate).getTime()
                            return Number(img.creationDate) <= beforeDateMiliSec
                        })
                    }

                    images.map(image => {
                        imagesHtml +=
                            `<fieldset id=""> 
                             <legend>${image.imageTitle}:</legend>
                             <img src="${image.imageUrl}"></img>
                             <p>${image.description}</p>
                             <button onclick='location.href="/delete?id=${image._id}"' class="deleteBtn">
                             Delete </button>
                         </fieldset>`
                    })

                    data = data.toString().replace("<div class='replaceMe'></div>", imagesHtml)
                    res.writeHead(200, { 'Content-Type': 'text/html' })
                    res.write(data)
                    res.end()
                })
        })

    } else {
        return true
    }
}