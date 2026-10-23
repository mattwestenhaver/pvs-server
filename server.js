require('dotenv').config()

const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3001
const emailRoutes = require('./routes/emailRoutes.js')
const quoteRoutes = require('./routes/quoteRoutes.js')
const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/premiere'

mongoose
    .connect(MONGODB_URI)
    .then(() => console.log(`🤘🏾 Connected to Mongo @ ${MONGODB_URI}`))
    .catch((err) => console.log(err))

// Heroku sits behind a proxy; trust it so rate limiting sees real client IPs
app.set('trust proxy', 1)

app.use(cors())
app.use(logger('dev'))
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: 'API root', success: 'API successfully loaded' })
})

app.use('/email', emailRoutes)
app.use('/quotes', quoteRoutes)

app.listen(PORT, (err) => {
    console.log(err || `👏🏾 Server running on ${PORT}`)
})
