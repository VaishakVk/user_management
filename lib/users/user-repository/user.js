const q = require("q");
const user = require("../../../db/models/user");
const encrypt = require("../../../util/encryptPassword");
const compareHash = require("../../../util/comparePassword");
const signJWT = require("../../../util/signJWT");
const factory = require("../../../db/factory");

const createUser = async (name, password, email) => {
	const deferred = q.defer();
	try {
		userData = await factory.findOne(user, { email });

		if (userData)
			deferred.reject({
				statusCode: 400,
				message: "User already exist"
			});
		else {
			const passwordHash = await encrypt(password);
			const userSchema = {
				email,
				passwordHash,
				name
			};
			const createdUser = await factory.createOne(user, userSchema);
			const userPayload = {
				email: createdUser.email,
				name: createdUser.name
			};
			const token = signJWT(userPayload);
			deferred.resolve({ token });
		}
	} catch (err) {
		deferred.reject({ statusCode: 500, message: err });
	} finally {
		return deferred.promise;
	}
};

const loginUser = async (email, password) => {
	const deferred = q.defer();
	try {
		userData = await factory.findOne(user, { email });

		if (!userData)
			deferred.reject({
				statusCode: 400,
				message: "User does not exist"
			});
		else {
			const result = await compareHash(password, userData.passwordHash);
			if (result) {
				const userSchema = {
					email: userData.email,
					name: userData.name
				};
				const token = signJWT(userSchema);
				deferred.resolve({ token });
			} else {
				deferred.reject({
					statusCode: 400,
					message: "Invalid UserName/Password"
				});
			}
		}
	} catch (err) {
		deferred.reject({ statusCode: 500, message: err });
	} finally {
		return deferred.promise;
	}
};

const getProfile = async email => {
	const deferred = q.defer();
	try {
		userData = await factory.findOne(
			user,
			{ email },
			{ select: { email: 1, name: 1 } }
		);
		if (!userData) {
			deferred.reject({ statusCode: 400, message: "Invalid User" });
		}
		deferred.resolve(userData);
	} catch (err) {
		deferred.reject({ statusCode: 500, message: err });
	}

	return deferred.promise;
};

const updateProfile = async (email, name, password) => {
	const deferred = q.defer();
	try {
		const passwordHash = await encrypt(password);

		factory.updateOne(user, { email }, { name, passwordHash });

		deferred.resolve(userData);
	} catch (err) {
		deferred.reject({ statusCode: 500, message: err });
	}
};
module.exports = {
	createUser,
	loginUser,
	getProfile,
	updateProfile
};
