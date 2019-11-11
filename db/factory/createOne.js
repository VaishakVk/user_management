const q = require("q");
module.exports = async (Model, options) => {
	const deferred = q.defer();

	const row = new Model(options);
	row.save()
		.then(data => {
			deferred.resolve(data);
		})
		.catch(err => {
			deferred.reject({ statusCode: 500, error: err });
		});
	return deferred.promise;
};
