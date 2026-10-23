const express = require('express')
const emailRouter = new express.Router()
const emailController = require('../controllers/emailController.js')

emailRouter.post('/quote', emailController.quote)
emailRouter.post('/work', emailController.work)

module.exports = emailRouter
