const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

// add param middleware to validate if id is not valid
router.param("id", productController.checkID);

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createNewProduct);

router
  .route("/:id")
  .get(productController.getProductById)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;

//========================================================================
// 3) ROUTE
// Cach 1
// app.get("/api/v1/products", getAllProducts);
// app.post("/api/v1/products", createNewProduct);
// app.get("/api/v1/products/:id", getProductById);
// app.patch("/api/v1/products/:id", updateProduct);
// app.delete("/api/v1/products/:id", deleteProduct);

// Cach 2
// app.route("/api/v1/products").get(getAllProducts).post(createNewProduct);

// app
//   .route("/api/v1/products/:id")
//   .get(getProductById)
//   .patch(updateProduct)
//   .delete(deleteProduct);
