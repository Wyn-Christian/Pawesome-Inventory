const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { getValue } = require("../utils");

const ProductSchema = new Schema(
	{
		name: String,
		quantity: Number,
		unit: String,
		buy_price: {
			type: mongoose.Types.Decimal128,
			get: getValue,
			required: true,
		},
		sale_price: {
			type: mongoose.Types.Decimal128,
			get: getValue,
			required: true,
		},
		category: {
			type: mongoose.Types.ObjectId,
			ref: "Category",
			required: true,
		},
		media: {
			type: mongoose.Types.ObjectId,
			ref: "Media",
			default: null,
		},
	},
	{
		timestamps: true,
		toJSON: {
			getters: true,
		},
	}
);

module.exports = mongoose.model("Product", ProductSchema);
