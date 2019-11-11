const q = require("q");
module.exports = (Model, condition, payload) => {
	const deferred = q.defer();

	Model.updateOne(condition, payload)
		.then(data => {
			deferred.resolve(data);
		})
		.catch(err => {
			deferred.reject(err);
		});
	return deferred.promise;
};
