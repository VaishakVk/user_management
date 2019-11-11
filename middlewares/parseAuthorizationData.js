const decodeJWT = require("../util/decodeJWT");

module.exports = (req, res, next) => {
	try {
		if (!req.headers[ "authorization" ] && !req.headers[ "Authorization" ]) {
			next({
				statusCode: 417,
				message: "Token Header Missing"
			});
		} else {
			token = req.headers[ "authorization" ]
				? req.headers[ "authorization" ]
				: req.headers[ "Authorization" ];

			const userData = decodeJWT(token, process.env.SECRET);
			if (!userData) next({ statusCode: 417, message: "Invalid Token" });
			else {
				req.user = userData;
				next();
			}
		}
	} catch (e) {
		next({ statusCode: 500, message: e });
	}
};
