module.exports = (req, res, next) => {
	const query = { ...req.query };
	let queryParse = parseParams(query);
	const params = { ...req.params };
	let paramsParse = parseParams(params);
	const body = { ...req.body };
	let bodyParse = parseParams(body);

	let outParams = { ...queryParse, ...paramsParse, ...bodyParse };
	res.locals.params = outParams;
	next();
};

const parseParams = json => {
	const outParams = {};
	for (let key in json) {
		if (json.hasOwnProperty(key)) {
			outParams[ key ] = json[ key ];
		}
	}
	return outParams;
};
