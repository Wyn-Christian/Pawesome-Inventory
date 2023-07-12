const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const { getValue } = require("../utils");

const SaleSchema = new Schema(
	{
		product: {
			type: mongoose.Types.ObjectId,
			ref: "Product",
			required: true,
		},
		quantity: Number,
		price: {
			type: mongoose.Types.Decimal128,
			get: getValue,
			required: true,
		},

		date: Date,
	},
	{
		timestamps: true,
		toJSON: {
			getters: true,
		},
	}
);

SaleSchema.virtual("date_formatted").get(function () {
	return this.date
		? DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_FULL)
		: "";
});

module.exports = mongoose.model("Sale", SaleSchema);
