const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const UserSchema = new Schema(
	{
		name: String,
		username: String,
		password: String,
		level: {
			type: mongoose.Types.ObjectId,
			ref: "User Group",
			required: true,
		},
		image: { type: String, default: null },
		status: {
			type: String,
			enum: ["Active", "Deactive"],
			required: true,
		},
		last_login: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	}
);
UserSchema.virtual("img_url").get(function () {
	return `/images/users/${this.image}`;
});
UserSchema.virtual("last_login_formatted").get(function () {
	return this.last_login
		? DateTime.fromJSDate(this.last_login).toLocaleString(
				DateTime.DATETIME_MED
		  )
		: "";
});

module.exports = mongoose.model("User", UserSchema);
