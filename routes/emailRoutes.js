const
  express = require('express'),
  emailRouter = new express.Router(),
  emailController = require('../controllers/emailController.js')
;

emailRouter.post('/quote', emailController.quote)
emailRouter.post('/work', emailController.work)

module.exports = emailRouter