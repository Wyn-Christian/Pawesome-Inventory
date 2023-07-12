const Sale = require("../models/sale");

exports.list = (req, res, next) => {
	Sale.find()
		.populate({
			path: "product",
			populate: "category media",
		})
		.then((result) => res.json(result))
		.catch((err) => next(err));
};

exports.detail = (req, res, next) => {
	Sale.findById(req.params.id)
		.populate({
			path: "product",
			populate: "category media",
		})
		.then((result) => res.json(result))
		.catch((err) => next(err));
};

exports.create = (req, res, next) => {
	const new_doc = new Sale(req.body);

	new_doc
		.save()
		.then((result) => res.json(result))
		.catch((err) => next(err));
};

exports.update = (req, res, next) => {
	Sale.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then((result) => {
			console.log("Update Sale Successfully", result);
			res.json(result);
		})
		.catch((err) => next(err));
};

exports.delete = (req, res, next) => {
	Sale.findByIdAndDelete(req.params.id)
		.then((result) => {
			console.log("Delete Sale Successfully", result);
			res.json({
				message: "Delete Successfully",
				result,
			});
		})
		.catch((err) => next(err));
};
