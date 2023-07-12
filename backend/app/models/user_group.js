const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserGroupSchema = new Schema(
	{
		name: String,
		level: Number,
		status: Number,
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("User Group", UserGroupSchema);
