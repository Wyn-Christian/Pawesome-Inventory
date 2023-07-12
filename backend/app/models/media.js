const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MediaSchema = new Schema(
	{
		file_name: { type: String, required: true },
		file_type: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);
MediaSchema.virtual("img_url").get(function () {
	return `/images/medias/${this.file_name}`;
});

module.exports = mongoose.model("Media", MediaSchema);
