const express = require('express')
const { rateLimit } = require('express-rate-limit')
const emailRouter = new express.Router()
const emailController = require('../controllers/emailController.js')

// Each submission sends email, so cap how often one visitor can submit
const submissionLimit = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 5,
    message: {
        success: false,
        message: 'Too many submissions. Please try again later.',
    },
})

emailRouter.post('/quote', submissionLimit, emailController.quote)
emailRouter.post('/work', submissionLimit, emailController.work)

module.exports = emailRouter
