const User = require("../models/user");
const Category = require("../models/category");
const Product = require("../models/product");
const Sale = require("../models/sale");

exports.counts = async (req, res, next) => {
	const result = {
		suppliers: await User.countDocuments(),
		categories: await Category.countDocuments(),
		products: await Product.countDocuments(),
		sales: await Sale.countDocuments(),
	};
	res.json(result);
};
