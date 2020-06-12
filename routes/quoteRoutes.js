const
  express = require('express'),
  quoteRouter = new express.Router(),
  quoteController = require('../controllers/quoteController.js')
;

quoteRouter.get('/', quoteController.index)

quoteRouter.patch('/:id/archive', quoteRouter.archive)

quoteRouter.patch('/:id/activate', quoteRouter.activate)

module.exports = quoteRouter