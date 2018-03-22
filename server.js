const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('./config')
const path = require('path')
const Url = require('./models/url')
const base62 = require('./base62')

const mongoDB = `mongodb://${config.db.host}/${config.db.name}`
mongoose.connect(mongoDB)
mongoose.Promise = global.Promise
const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  db.collection('urls').find().toArray((err, result) => {
    res.render('index.ejs', { urls: result })
  })
})

app.get('/:shortened_id', (req, res) => {
  let base62id = req.params.shortened_id
  let id = base62.decode(base62id)
  Url.findOne({sort: id}, (err, doc) => {
    if (doc) {
      res.redirect(doc.long_url)
    } else {
      res.redirect(config.webhost)
    }
  })
})

app.post('/shorten', (req, res) => {
  let longUrl = req.body.url
  let shortUrl = ''

  // Check if url is already in the database
  // yes -  return doc.sort, base62 
  Url.findOne({ long_url: longUrl }, (err, doc) => {
    if (doc) { // url has already been shortened
      shortUrl = `${config.webhost}/${base62.encode(doc.sort)}`

      res.send({ 'shortUrl': shortUrl })
    } else { // url has not been found, generate new one.
      let newUrl = Url({ long_url: longUrl })
      newUrl.save(err => {
        if (err) {
          console.log(err)
        }
        // construct the short URL
        shortUrl = `${config.webhost}/${base62.encode(newUrl.sort)}`
        return res.send({'shortUrl': shortUrl})
      })
    }
  })

})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Connected to ${port}`);
});
