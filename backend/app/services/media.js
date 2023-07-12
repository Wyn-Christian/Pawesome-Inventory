const Media = require("../models/media");

exports.list = (req, res, next) => {
	Media.find()
		.then((result) => res.json(result))
		.catch((err) => next(err));
};

exports.detail = (req, res, next) => {
	Media.findById(req.params.id)
		.then((result) => res.json(result))
		.catch((err) => next(err));
};

exports.create = (req, res, next) => {
	const media = {
		file_name: req.file.filename,
		file_type: req.file.mimetype,
	};

	const new_doc = new Media(media);

	new_doc
		.save()
		.then((result) => res.json(result))
		.catch((err) => next(err));
};

// exports.update = (req, res, next) => {
// 	Media.findByIdAndUpdate(
// 		req.params.id,
// 		{
// 			file_name: req.file.filename,
// 			file_type: req.file.mimetype,
// 		},
// 		{ new: true }
// 	)
// 		.then((result) => {
// 			console.log("Update Media Successfully", result);
// 			res.json(result);
// 		})
// 		.catch((err) => next(err));
// };

exports.delete = (req, res, next) => {
	Media.findByIdAndDelete(req.params.id)
		.then((result) => {
			console.log("Delete Category Successfully", result);
			res.json({
				message: "Delete Successfully",
				result,
			});
		})
		.catch((err) => next(err));
};
