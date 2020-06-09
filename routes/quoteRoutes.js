const
  express = require('express'),
  quoteRouter = new express.Router(),
  quoteController = require('../controllers/quoteController.js')
;

quoteRouter.get('/', quoteController.index)

module.exports = quoteRouter