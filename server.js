const
  dotenv = require('dotenv').load(),
  express = require('express'),
  logger = require('morgan'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  app = express(),
  PORT = process.env.PORT || 3001,
  emailRoutes = require('./routes/emailRoutes.js')
;

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.json({message:'API root', success: 'API successfully loaded'})
})

app.use('/email', emailRoutes)

app.listen(PORT, (err) => {
  console.log(err || `👏🏾 Server running on ${PORT}`)
});