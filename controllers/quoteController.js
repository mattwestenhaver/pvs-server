const
    Quote = require('../models/Quote.js')
;

module.exports = {

	index: (req, res) => {
		Quote.find({})
			.then((quotes) => res.json({
				success: true,
				quotes
			}))
			.catch((err) => res.json({
				success: false,
				code: err.code
			}))
	},

	archive: (req, res) => {
		Quote.findByIdAndUpdate(req.params.id, { $set: { archived: true } })
			.then((archivedQuote) => res.json({ success: true, message: "Quote Archived", archivedQuote}))
			.catch((err) => res.json({ success: false, error: err}))
	},

	activate: (req, res) => {
		Quote.findByIdAndUpdate(req.params.id, { $set: { archived: false } })
			.then((activatedQuote) => res.json({ success: true, message: "Quote Unarchived", activatedQuote}))
			.catch((err) => res.json({ success: false, error: err}))
	}

}