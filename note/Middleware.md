## Middleware
- can add multiple middleware 
- don't forget ```next()``` funtion

```php
router
  .route("/")
  .get(productController.getAllProducts)

  // add checkbody middleware
  .post(productController.checkBody, productController.createNewProduct);

```

```php
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

```