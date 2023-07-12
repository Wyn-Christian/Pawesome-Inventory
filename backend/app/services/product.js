const Product = require("../models/product");

exports.list = (req, res, next) => {
	Product.find()
		.populate("category media")
		.then((result) => res.json(result))
		.catch((err) => next(err));
};

exports.detail = (req, res, next) => {
	Product.findById(req.params.id)
		// .populate("category media")
		.then((result) => res.json(result))
		.catch((err) => next(err));
};

exports.create = (req, res, next) => {
	const new_doc = new Product(req.body);
	console.log(req.body);

	new_doc
		.save()
		.then((result) => res.json(result))
		.catch((err) => next(err));
};

exports.update = (req, res, next) => {
	Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then((result) => {
			console.log("Update Product Successfully", result);
			res.json(result);
		})
		.catch((err) => next(err));
};

exports.delete = (req, res, next) => {
	Product.findByIdAndDelete(req.params.id)
		.then((result) => {
			console.log("Delete Product Successfully", result);
			res.json({
				message: "Delete Successfully",
				result,
			});
		})
		.catch((err) => next(err));
};
