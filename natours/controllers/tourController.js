const Tour = require("../models/Tour");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

//[POST] /tours

exports.createTour = catchAsync(async (req, res) => {
  const formData = req.body;
  const newTour = await Tour.create(formData);
  res.status(201).json({
    status: "success",
    data: {
      tour: newTour,
    },
  });
});

//   [GET] /tours
exports.getAllTours = catchAsync(async (req, res, next) => {
  // 1) Filtering
  const queryObj = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  // remove the params special like ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queryObj[el]);

  // 2) Advanced filtering
  let queryStr = JSON.stringify(queryObj);
  // eslint-disable-next-line prettier/prettier
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  let query = Tour.find(JSON.parse(queryStr));

  // 3) Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    // by default sort by createAt descending
    query = query.sort("-createAt");
  }

  // 4) field limiting
  // to get fields selected, not get all
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    query = query.select(fields);
  } else {
    query = query.select("-__v");
  }

  // 5) Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;
  const numTours = await Tour.countDocuments();
  query = query.skip(skip).limit(limit);

  if (req.query.page) {
    if (skip >= numTours) {
      throw new Error("This page does not exits");
    }
  }
  // EXECUTE QUERY
  const tours = await query;

  res.status(200).json({
    status: "success",
    results: tours.length,
    data: tours,
    pageInfor: {
      page,
      limit,
      totalCount: numTours,
      totalPage: Math.ceil(numTours / limit),
    },
  });
});

// [GET] /top-3-cheap
exports.aliasTopTours = catchAsync(async (req, res, next) => {
  req.query.limit = "3";
  req.query.sort = "price, -ratingsAverage";
  req.query.fields = "name,price, ratingsAverage, difficulty";
  next();
});

//   [GET] /tours/:id
exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);

  if (!tour) {
    next(new AppError("No tour found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: tour,
  });
});

// [PATCH] /tours/:id
exports.updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    // enable mode to get result as tour
    new: true,
    // enable mode to validate when update
    runValidators: true,
  });

  if (!tour) {
    next(new AppError("No tour found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: tour,
  });
});

// [DELETE] /tours/:id
exports.deleteTour = catchAsync(async (req, res, next) => {
  await Tour.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getTourStats = catchAsync(async (req, res, next) => {
  try {
    const stats = await Tour.aggregate(
      // each element in this array will be one of the stages
      [
        {
          $match: { ratingsAverage: { $gte: 2 } },
        },
        // there are all the statistics for all the tours together
        // {
        //   $group: {
        //     _id: null,
        //     numTours: { $sum: 1 },
        //     numRatings: { $sum: "$ratingsQuantity" },
        //     avgRating: { $avg: "$ratingsAverage" },
        //     avgPrive: { $avg: "$price" },
        //     minPrice: { $min: "$price" },
        //     maxPrice: { $max: "$price" },
        //   },
        // },

        // group for different fileds
        // this mean group by difficulty field, all tour have the same difficulty will be grouped
        {
          $group: {
            _id: "$difficulty",
            // _id: "$ratingsAverage",
            // _id: { $toUpper: "$difficulty" },
            numTours: { $sum: 1 },
            numRatings: { $sum: "$ratingsQuantity" },
            avgRating: { $avg: "$ratingsAverage" },
            avgPrive: { $avg: "$price" },
            minPrice: { $min: "$price" },
            maxPrice: { $max: "$price" },
            tours: {
              $push: {
                name: "$name",
                price: "$price",
                duration: "$duration",
              },
            },
          },
        },

        // sort
        {
          $sort: { avgPrive: -1 }, // 1 for ascending
        },
        // match multiple time
        {
          // matched once before
          $match: { _id: { $ne: "easy" } },
        },
      ]
    );
    res.status(200).json({
      status: "success",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
});

exports.getMonthyPlan = catchAsync(async (req, res, next) => {
  try {
    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
      {
        $unwind: "$startDates",
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$startDates" },
          numTourStarts: { $sum: 1 },

          // pushed one filed name
          _tours: { $push: "$name" },
          // used push multiple
          tours: {
            $push: {
              name: "$name",
              price: "$price",
              // desc: "Push multiple !!",
            },
          },
        },
      },
      // modify title
      { $addFields: { month: "$_id" } },
      {
        $project: {
          _id: 0, // specify _id is 0 (not null or something diffferent from 0)
        },
      },
      {
        $sort: {
          numTourStarts: -1,
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: plan,
    });
  } catch (error) {
    next(error);
  }
});
