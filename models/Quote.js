const
  mongoose = require('mongoose')

  quoteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, default: null },
    city: { type: String, default: null },
    zipcode: { type: Number, default: null },
    eventDate: { type: String, default: null },
    eventType: { type: String, default: null },
    guests: { type: Number, default: null },
    cars: { type: Number, default: null },
    arrival: { type: String, default: null },
    departure: { type: String, default: null },
    comments: { type: String, default: null },
    reference: { type: String, default: null },
  })
;

const Quote = mongoose.model('Quote', quoteSchema)
module.exports = Quote