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
	},

	archive: (req, res) => {
		Quote.findByIdAndUpdate(req.params.id, { $set: { archived: true } }, (err, archivedQuote) => {
			if (err) return res.json({ success: false, error: err})
			res.json({ success: true, message: "Quote Archived", archivedQuote})
		})
	},

	activate: (req, res) => {
		Quote.findByIdAndUpdate(req.params.id, { $set: { archived: false } }, (err, activatedQuote) => {
			if (err) return res.json({ success: false, error: err})
			res.json({ success: true, message: "Quote Unarchived", activatedQuote})
		})
	}

}