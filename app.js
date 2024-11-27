const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const compression = require("compression");
const {createInstitute, getInstitutes} = require("./institute.controller");
// const globalErrorHandler = require('./middleware/globalErrorHandler');
// const mainRoutes = require('./route');
// const ApiError = require('./utils/apiError');
// const { STATUS_CODES } = require('./utils/constants');
const { Router } = require("express");

const app = express();

const router = Router();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Custom-Header"],
    exposedHeaders: ["Authorization", "X-Custom-Header"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.options("*", cors());

app.use(
  session({
    secret: "PMS",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Institute is running ...");
});
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(compression());
console.log(createInstitute);

app.post("/createInstitute", createInstitute);
app.get('/institutes', getInstitutes);

module.exports = { app };
