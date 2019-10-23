const fs = require('fs')
const url = require('url')
const path = require('path')
const shortId = require('shortid')
const formidable = require('formidable')
const database = require('../config/dataBase')

function viewAll(req, res) {
  //todo

  let filePath = path.join(__dirname, '../views/viewAll.html')

  fs.readFile(filePath, (err, data) => {  // load the html file
    if (err) {
      console.error(err)
    }

    //// load the memes as a stream and pipe them into the res obj

    let allMemes = ''

    database.load()
    database.getDb()    // todo
      .sort((a, b) => b.dateStamp - a.dateStamp)
      .forEach(meme => {

        if (meme.privacy === 'on') {

          allMemes += `
          <div class="meme">
          <a href="/getDetails?id=${meme.id}">
          <img class="memePoster" src="${meme.memeSrc}"/>
          </div>`
        }
      })

    data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', allMemes)

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write(data)
    res.end()
  })
}

function getDetails(req, res) {

  let filePath = path.join(__dirname, '../views/details.html')

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err)
    }

    database.load()
    let memeId = url.parse(req.url).query.slice(3)
    let targetedMeme = database.getDb().find(meme => meme.id === memeId)

    let memeHTML = `
      <div class="content">
         <img src="${targetedMeme.memeSrc}" alt=""/>
         <h3>Title ${targetedMeme.title}</h3>
         <p> ${targetedMeme.description}</p>
      </div>`

    data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', memeHTML)
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write(data)
    res.end()
  })

}

function viewAddMeme(req, res) {
  let filePath = path.join(__dirname + '/../', 'views/addMeme.html')

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err)
      return
    }

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write(data)
    res.end()
  })
}

function getFileExtension(filename) {
  console.log(filename);

  filename = filename.split('.')[1] //! is this enough
  return filename.toLowerCase()
}

function addMeme(req, res) {
  let meme = {}
  meme.id = shortId.generate()
  meme.dateStamp = Date.now()
  meme.privacy = 'off'  //* by default

  let form = new formidable.IncomingForm()
  // req.on('data', (data) => {
  // console.log(data.toString());

  form.parse(req)

  // change the directory in which the file will be saved so you won't need to do this with fs
  form.on('fileBegin', function (name, file) {
    file.path = __dirname + `\\..\\public\\memeStorage\\${meme.id}.` + getFileExtension(file.name)
  })

  // authomatically saves the received file
  form.on('file', function (name, file) {
    // console.log(file);

    let fileExtension = getFileExtension(file.name)
    let filepath = `./public/memeStorage/${meme.id}.` + fileExtension
    meme.memeSrc = filepath

    // fs.rename(file.path, filepath, err => {
    //   if (err) {
    //     console.log(err)
    //   }
    // })
  })

  form.on('field', function (name, value) {

    let fieldNames = {
      memeTitle: 'title',
      status: 'privacy',
      memeDescription: 'description'
    }

    meme[fieldNames[name]] = value
  })

  form.on('end', function () {
    database.load()
    database.add(meme)
    database.save()

    res.writeHead(302, { 'Location': '/viewAllMemes' })
    res.end()
  })

  // })

  // req.on('end', () => {
  //
  //
  // })
  //
  // res.end()
}


module.exports = (req, res) => {
  if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
    viewAll(req, res)

  } else if (req.pathname === '/addMeme' && req.method === 'GET') {
    viewAddMeme(req, res)

  } else if (req.pathname === '/addMeme' && req.method === 'POST') {
    addMeme(req, res)

  } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {
    getDetails(req, res)

  } else if (req.pathname.startsWith('public/memeStorage') && req.method === 'GET') {
    console.log('HERE')

  }
  else { // if the request is not handled
    return true
  }
}