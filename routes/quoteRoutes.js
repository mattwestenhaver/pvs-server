const
  express = require('express'),
  quoteRouter = new express.Router(),
  quoteController = require('../controllers/quoteController.js')
;

quoteRouter.get('/', quoteController.index)

quoteRouter.patch('/:id/archive', (req, res) => {
  quoteRouter.archive
})

quoteRouter.patch('/:id/activate', (req, res) => {
  quoteRouter.activate
})

module.exports = quoteRouter