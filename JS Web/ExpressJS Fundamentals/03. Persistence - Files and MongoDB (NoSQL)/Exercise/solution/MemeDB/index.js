const http = require('http')
const handlers = require('./handlers')
const port = 3001

const app = http.createServer((req, res) => {

    for (let handler of handlers) {
        if (!handler(req, res)) {
            break
        }
    }
})

app.listen(port)
console.log('Server listening at port: ' + port)