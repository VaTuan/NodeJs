const fs = require("fs");

const products = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data.json`)
);

const findProductIndex = (productId) => {
  return products.findIndex((el) => el.id === productId);
};

exports.checkID = (req, res, next, val) => {
  const id = val * 1;
  const index = findProductIndex(id);
  if (index < 0) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid Id",
    });
  }
  next();
};

// check body in post method, if name and price are null
exports.checkBody = (req, res, next) => {
  const { productName, price } = req.body;
  if (!productName || !price) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name or price",
    });
  }
  next();
};

exports.getAllProducts = (req, res) => {
  res.status(200).json({
    requestAt: req.requestTime,
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
};

exports.getProductById = (req, res) => {
  const id = req.params.id * 1;
  const index = findProductIndex(id);

  res.status(200).json({
    status: "success",
    data: {
      product: products[index],
    },
  });
};

exports.createNewProduct = (req, res) => {
  const newId = products[products.length - 1].id + 1;
  const newProduct = Object.assign({ id: newId }, req.body);
  products.push(newProduct);
  fs.writeFile(
    `${__dirname}/../dev-data/data.json`,
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

exports.updateProduct = (req, res) => {
  const index = findProductIndex(req.params.id * 1);
  products[index] = { ...products[index], ...req.body };

  fs.writeFile(
    `${__dirname}/../dev-data/data.json`,
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

exports.deleteProduct = (req, res) => {
  const newProduct = products.filter(
    (item) => `${item.id}` !== `${req.params.id}`
  );

  fs.writeFile(
    `${__dirname}/../dev-data/data.json`,
    JSON.stringify(newProduct),
    (err) => {
      res.status(204).json({
        status: "success",
        data: null,
      });
    }
  );
};
