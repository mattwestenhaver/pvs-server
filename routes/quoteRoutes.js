const
  express = require('express'),
  quoteRouter = new express.Router(),
  quoteController = require('../controllers/quoteController.js')
;

quoteRouter.get('/', quoteController.index)

quoteRouter.patch('/:id/archive', quoteController.archive)

quoteRouter.patch('/:id/activate/', quoteController.activate)

module.exports = quoteRouter