const User = require("../models/user");

exports.list = (req, res, next) => {
	User.find()
		.populate("level")
		.then((result) => res.json(result))
		.catch((err) => next(err));
};

exports.detail = (req, res, next) => {
	User.findById(req.params.id)
		// .populate("level")
		.then((result) => res.json(result))
		.catch((err) => next(err));
};

exports.delete = (req, res, next) => {
	User.findByIdAndDelete(req.params.id)
		.then((result) => {
			console.log("Delete User Successfully", result);
			res.json({
				message: "Delete Successfully",
				result,
			});
		})
		.catch((err) => next(err));
};

exports.login = async (req, res, next) => {
	let user = await User.findOne({
		email: req.body.email,
		password: req.body.password,
	});

	if (!user) return res.json({ error: "no user exists!" });

	return res.json(user);
};

exports.create = (req, res, next) => {
	const new_doc = new User(req.body);

	new_doc
		.save()
		.then((result) => res.json(result))
		.catch((err) => next(err));
};

exports.update = (req, res, next) => {
	const data = req.body;
	if (req.file) {
		data.image = req.file.filename;
	}
	User.findByIdAndUpdate(req.params.id, data, { new: true })
		.then((result) => {
			console.log("Update User Successfully", result);
			res.json(result);
		})
		.catch((err) => next(err));
};
