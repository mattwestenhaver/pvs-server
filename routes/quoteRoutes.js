const express = require('express')
const quoteRouter = new express.Router()
const quoteController = require('../controllers/quoteController.js')

quoteRouter.get('/', quoteController.index)

quoteRouter.patch('/:id/archive', quoteController.archive)

quoteRouter.patch('/:id/activate/', quoteController.activate)

module.exports = quoteRouter
