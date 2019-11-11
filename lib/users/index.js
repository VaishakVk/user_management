const userRepo = require("./user-repository/user");
const q = require("q");
const loginSchema = require("../../schema/login")
const signUpSchema = require("../../schema/signup")
const updateSchema = require("../../schema/updateProfile")

const validateSchema = require("../../util/comapreJSON");

const postSignUp = (req, res, next) => {
	const { name, email, password } = res.locals.params;

	validateSchema({ name, email, password }, signUpSchema)
		.then(() => {

			return userRepo
				.createUser(name, password, email)
		})
		.then(data => {
			res.status(200).send(data);
		})
		.catch(err => {
			next({
				statusCode: err.statusCode || 500,
				message: err.message || err
			});
		});
};

const postLogin = (req, res, next) => {
	const { email, password } = res.locals.params;
	validateSchema({ email, password }, loginSchema)
		.then(() => {

			return userRepo
				.loginUser(email, password)
		})
		.then(data => {
			res.status(200).send(data);
		})
		.catch(err => {
			next({
				statusCode: err.statusCode || 500,
				message: err.message || err
			});
		});
};

const getProfile = (req, res, next) => {
	const { email } = req.user;
	userRepo
		.getProfile(email)
		.then(data => {
			res.status(200).send(data);
		})
		.catch(err => {
			next({
				statusCode: err.statusCode || 500,
				message: err.message || err
			});
		});
};

const updateProfile = (req, res, next) => {
	const { email } = req.user;
	const { password, name } = res.locals.params;

	validateSchema({ password, name }, updateSchema)
		.then(() => {

			return userRepo
				.updateProfile(email, name, password)
		})
		.then(data => {
			res.status(200).send(data);
		})
		.catch(err => {
			next({
				statusCode: err.statusCode || 500,
				message: err.message || err
			});
		});
};

module.exports = {
	postSignUp,
	postLogin,
	getProfile,
	updateProfile
};
