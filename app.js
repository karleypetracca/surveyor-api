const express = require("express"),
	path = require("path"),
	cookieParser = require("cookie-parser"),
	logger = require("morgan"),
	es6Renderer = require("express-es6-template-engine"),
	cors = require("cors");

const app = express();

const corsOptions = {
	origin: "*",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	preflightContinue: false,
	optionsSuccessStatus: 204,
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers":
		"Origin, X-Requested-With, Content-Type, Accept",
};

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors(corsOptions));

app.engine("html", es6Renderer);
app.set("views", "./views");
app.set("view engine", "html");

const indexRouter = require("./routes/index");
const surveysRouter = require("./routes/surveys");

app.use("/", indexRouter);
app.use("/api/survey", surveysRouter);

module.exports = app;
