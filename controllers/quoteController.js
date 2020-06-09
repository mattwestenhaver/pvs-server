const
    Quote = require('../models/Quote.js')
;

module.exports = {

	index: (req, res) => {
		Quote.find({}, (err, quotes) => {
			if (err) return res.json({
				success: false,
				code: err.code
			})
			res.json({
				success: true,
				quotes
			})
		})
	}

}