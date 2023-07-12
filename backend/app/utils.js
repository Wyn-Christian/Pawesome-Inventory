exports.getValue = function (value) {
	if (typeof value !== "undefined") {
		return parseFloat(value.toString());
	}
	return value;
};
