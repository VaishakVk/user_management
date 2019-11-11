const jwt = require("jsonwebtoken");

module.exports = payload => {
	try {
		let token = jwt.sign(payload, process.env.SECRET, {
			expiresIn: "24h" // expires in 24 hours
		});

		return token;
	} catch (e) {
		return undefined;
	}
};
