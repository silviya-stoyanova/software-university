const path = require('path')
const fs = require('fs')
const url = require('url')

module.exports = function (req, res) {

    if (req.url === '/' && req.method === 'GET') {

        // fs.readFile('./views/home.html', (err, data) => {
        //     if (err) {
        //         console.error(err)
        //     }
        //
        //     res.writeHead(200, { 'Content-Type': 'text/html' })
        //     res.write(data)
        //     res.end()
        // })

        // this here does the same as the code above
        let rs = fs.createReadStream('./views/home.html')
        rs.pipe(res)

    } else {  // if the request is not handled
        return true
    }
}