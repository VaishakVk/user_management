const mongoose = require("mongoose");
const MONGODB_URI =
	"mongodb+srv://" +
	process.env.MONGO_USER +
	":" +
	process.env.MONGO_PASSWORD +
	"@clusterdb-ohjmw.mongodb.net/" +
	process.env.MONGO_DEFAULT_DATABASE;

module.exports = () => {
	try {

		mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, err => {
			if (err) {
				throw new Error(`Error connecting to Database: ${err}`);
			} else {
				console.log("Connected to Database...");
			}
		});
	} catch (err) {
		throw new Error(`Error connecting to Database: ${err}`);
	}
};
