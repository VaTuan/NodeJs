const fs = require("fs");
const express = require("express");
const morgan = require("morgan");

const app = express();

// 1) MIDDLE WARE
//implement morgan middleware
app.use(morgan("dev"));

// this is middle ware to transfrom data to json (for post,... method)
app.use(express.json());

// this is my middleware,
app.use((req, res, next) => {
  console.log("Hello from middleware  ");
  next();
});

app.use((req, res, next) => {
  // add requestTime to req, then you can get in req, something like req.requestTime
  req.requestTime = new Date().toISOString();
  next();
});

const products = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data.json`));

const findProductIndex = (productId) => {
  return products.findIndex((el) => el.id === productId);
};

// 2) ROUTE HANDLERS
const getAllProducts = (req, res) => {
  res.status(200).json({
    requestAt: req.requestTime,
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
};

const getProductById = (req, res) => {
  const id = req.params.id * 1;
  const index = findProductIndex(id);
  if (index < 0) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid Id",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      product: products[index],
    },
  });
};

const createNewProduct = (req, res) => {
  const newId = products[products.length - 1].id + 1;
  const newProduct = Object.assign({ id: newId }, req.body);
  products.push(newProduct);
  fs.writeFile(
    `${__dirname}/dev-data/data.json`,
    JSON.stringify(products),
    (data, error) => {
      res.status(201).json({
        status: "success",
        data: {
          product: newProduct,
        },
      });
    }
  );
};

const updateProduct = (req, res) => {
  const index = findProductIndex(req.params.id * 1);
  if (index < 0) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid Id",
    });
  }
  products[index] = { ...products[index], ...req.body };

  fs.writeFile(
    `${__dirname}/dev-data/data.json`,
    JSON.stringify(products),
    (err) => {
      res.status(200).json({
        status: "success",
        data: {
          product: { ...products[index], ...req.body },
        },
      });
    }
  );
};

const deleteProduct = (req, res) => {
  const index = findProductIndex(req.params.id * 1);
  if (index < 0) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid Id",
    });
  }
  const newProduct = products.filter(
    (item) => `${item.id}` !== `${req.params.id}`
  );

  fs.writeFile(
    `${__dirname}/dev-data/data.json`,
    JSON.stringify(newProduct),
    (err) => {
      res.status(204).json({
        status: "success",
        data: null,
      });
    }
  );
};

// 3) ROUTE

// C1
// app.get("/api/v1/products", getAllProducts);
// app.post("/api/v1/products", createNewProduct);
// app.get("/api/v1/products/:id", getProductById);
// app.patch("/api/v1/products/:id", updateProduct);
// app.delete("/api/v1/products/:id", deleteProduct);

// C2
// app.route("/api/v1/products").get(getAllProducts).post(createNewProduct);

// app
//   .route("/api/v1/products/:id")
//   .get(getProductById)
//   .patch(updateProduct)
//   .delete(deleteProduct);

const productRouter = express.Router();

productRouter.route("/").get(getAllProducts).post(createNewProduct);
productRouter
  .route(":id")
  .get(getProductById)
  .patch(updateProduct)
  .delete(deleteProduct);

app.use("/api/v1/products", productRouter);

//4) START SERVER
const port = 3001;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
