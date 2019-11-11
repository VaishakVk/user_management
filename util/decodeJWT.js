const jwt = require("jsonwebtoken");

module.exports = payload => {
	try {
		let token = jwt.verify(payload, process.env.SECRET);
		return token;
	} catch (e) {
		return undefined;
	}
};
