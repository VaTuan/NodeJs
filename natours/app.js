const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const productRouter = require("./routes/productRoutes");
const courseRouter = require("./routes/courseRoutes");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./middleware/errorMiddleware");

const app = express();

// 1) GLOBAL MIDDLE WARE
// Set Security HTTP headers
app.use(helmet());

// Development loging
//  implement morgan middleware when acctualy in development evironment
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit request from same API
// If within a period of 15 minutes, if there are more than 100 requests sent, it will be stopped
// to avoid a BRUTE FORCE ATTACKS
const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: "Too many request from this IP, please try again in an hour !",
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
// this is middle ware to transfrom data to json (for post,... method)
app.use(
  express.json({
    limit: "10kb",
  })
);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());

// Serving static files
// try http://localhost:3001/template-overview.html in your browser
// all file, image have on public folder can show when type correct path
// example http://localhost:3001/avatar.png (avatar image has already in public folder)
app.use(express.static(`${__dirname}/public`));

// Test middleware
// this is my middleware,
app.use((req, res, next) => {
  // console.log("-----Hello from middleware-----");
  next();
});

// this is middleware add requestTime to req, then you can get in req, something like req.requestTime
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// ROUTES
app.use("/api/v1/products", productRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// Handing unhandled routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error middleware
app.use(globalErrorHandler);

module.exports = app;
