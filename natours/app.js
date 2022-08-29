const express = require("express");
const morgan = require("morgan");

const productRouter = require("./routes/productRoutes");

const app = express();

// 1) MIDDLE WARE
//implement morgan middleware
app.use(morgan("dev"));

// this is middle ware to transfrom data to json (for post,... method)
app.use(express.json());

// this is my middleware,
app.use((req, res, next) => {
  console.log("-----Hello from middleware-----");
  next();
});

//this is middleware add requestTime to req, then you can get in req, something like req.requestTime
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/products", productRouter);

module.exports = app;
