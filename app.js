const express = require("express");
const parseParams = require("./middlewares/parseParams");
require("dotenv").config();
require("./db/config")();

const app = express();

const userRoutes = require("./routes/user");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(parseParams);

app.use("/api/user", userRoutes);

app.use((err, req, res, next) => {
	console.log(err);
	res.status(err.statusCode || 500).send({ message: err.message || err });
});
module.exports = app;
