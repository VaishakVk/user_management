const bcrypt = require("bcrypt");
const q = require("q");
module.exports = (password, hashPassword) => {
	const deferred = q.defer();
	bcrypt
		.compare(password, hashPassword)
		.then(status => {
			if (status) deferred.resolve(true);
			else deferred.resolve(false);
		})
		.catch(err => {
			deferred.resolve(false);
		});

	return deferred.promise;
};
