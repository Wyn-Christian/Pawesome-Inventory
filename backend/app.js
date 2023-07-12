const mongoose = require("mongoose");
const castAggregation = require("mongoose-cast-aggregation");
require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
var app = express();

var indexRouter = require("./app/routes/index");

mongoose.plugin(castAggregation);
mongoose.set("toJSON", { virtuals: true });
mongoose.set("id", true);
mongoose.set("strictQuery", false);

const mongodbUrl =
	"mongodb+srv://admin:1234@school-projects.fypwgh1.mongodb.net/pawesome-inventory?retryWrites=true&w=majority";
mongoose
	.connect(process.env.MONGODB_URI || mongodbUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		dbName: "pawesome-inventory",
	})
	.then(() => console.log("Connected Successfully"))
	.catch((err) => {
		console.error(err);
	});
let db = mongoose.connection;

// MIDDLEWARES
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	console.error(err.message);
	res.json({
		error: err.message,
	});
});

module.exports = app;
