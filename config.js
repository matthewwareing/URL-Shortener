const dotenv = require('dotenv').config();
let config = {}
config.db = {}
config.webhost = 'http://localhost:3000'
config.db.host = process.env.DB_HOST
config.db.name = 'url-shortener'

module.exports = config