const q = require("q");
module.exports = async (Model, payload, options) => {
	const deferred = q.defer();

	let query = Model.findOne(payload);
	if (options) {
		if (options.select) query = query.select(options.select);
	}

	query
		.then(data => {
			deferred.resolve(data);
		})
		.catch(err => {
			deferred.reject(err);
		});
	return deferred.promise;
};
