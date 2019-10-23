const fs = require('fs')
const path = require('path')

function getFileExtention(pathname) {
    let fileExtention = pathname.match(/\.[a-z]+$/)

    const contentType = {
        '.css': 'text/css',
        '.ico': 'image/x-icon',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
    }

    return contentType[fileExtention]
}

module.exports = function (req, res) {
    let pathname = path.join(__dirname + '/../', req.url)

    if (req.url.startsWith('/public/') && req.method === 'GET') {
        fs.readFile(pathname, (err, data) => {
            if (err) {
                console.error(err)
                res.writeHead(404, { 'Content-Type': 'text/html' })
                res.end()
                return
            }

            res.writeHead(200, { 'Content-Type': getFileExtention(req.url) })
            res.write(data)
            res.end()
        })

    } else {  // if the request is not handled
        return true
    }
}