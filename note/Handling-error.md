## Error handling in Express
have 2 tpyes of errors
1. Operational errors (Loi hoat dong)
operational errors are problems that we can predict will inevitably happen  at some point in future

loi hoat dong la van de ma chung ta co the du doan chac chan se xay ra tai mot so thoi diem trong tuong lai
2. Programming errors (Loi lap tring)
which are simply bugs that we developers

```php

  // create catchAsync function to handle error
  //[POST] /tours
  createTour = catchAsync(async (req, res) => {
    const formData = req.body;
    const newTour = await Tour.create(formData);
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  });

```

```php
  
  // or using next() middleware inside function
  // [DELETE] /tours/:id
  async deleteTour(req, res, next) {
    try {
      await Tour.findByIdAndDelete(req.params.id);
      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (error) {
        // using next middleware
      next(error);
    }
  }
```