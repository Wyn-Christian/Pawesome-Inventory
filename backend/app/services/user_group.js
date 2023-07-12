const UserGroup = require("../models/user_group");

exports.list = (req, res, next) => {
	UserGroup.find()
		.then((result) => res.json(result))
		.catch((err) => next(err));
};

exports.detail = (req, res, next) => {
	UserGroup.findById(req.params.id)
		.then((result) => res.json(result))
		.catch((err) => next(err));
};

exports.create = (req, res, next) => {
	const new_doc = new UserGroup(req.body);

	new_doc
		.save()
		.then((result) => res.json(result))
		.catch((err) => next(err));
};

exports.update = (req, res, next) => {
	UserGroup.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then((result) => {
			console.log("Update User Group Successfully", result);
			res.json(result);
		})
		.catch((err) => next(err));
};

exports.delete = (req, res, next) => {
	UserGroup.findByIdAndDelete(req.params.id)
		.then((result) => {
			console.log("Delete User Group Successfully", result);
			res.json({
				message: "Delete Successfully",
				result,
			});
		})
		.catch((err) => next(err));
};
