const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CounterSchema = new Schema({
  _id: { type: String, required: true },
  seq_value: { type: Number, default: 0 }
})

const counter = mongoose.model('counter', CounterSchema)

const UrlSchema = new Schema({
  sort: Number,
  long_url: String,
  created_at: Date
})

UrlSchema.pre('save', function (next) {
  var doc = this;
  counter.findByIdAndUpdate(
    { _id: 'url_count' },
    { $inc: { seq_value: 1 } },
    { new: true, upsert: true }).then(function (count) {
      console.log("...count: " + JSON.stringify(count))
      doc.sort = count.seq_value
      doc.created_at = new Date()
      next()
    })
    .catch(function (error) {
      console.error("counter error-> : " + error)
      throw error
    })
})

Url = mongoose.model('Url', UrlSchema)

module.exports = Url