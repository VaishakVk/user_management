const bcrypt = require("bcrypt");
const q = require("q");
module.exports = password => {
	const rounds = 12;
	const deferred = q.defer();

	bcrypt
		.hash(password, rounds)
		.then(hash => {
			deferred.resolve(hash);
		})
		.catch(err => {
			deferred.reject({ statusCode: 500, message: err });
		});

	return deferred.promise;
};
