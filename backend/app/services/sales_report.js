const Sale = require("../models/sale");

exports.sales_by_range = async (req, res, next) => {
	Sale.find({
		date: {
			$gte: req.body.start_date,
			$lte: req.body.end_date,
		},
	})
		.populate("product")
		.then((result) => res.json(result))
		.catch((err) => next(err));
};
