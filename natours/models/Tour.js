const mongoose = require("mongoose");
const slugify = require("slugify");

const { Schema } = mongoose;

const tourSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, "A tour must have duration"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have a group size"],
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have a difficulty"],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "A tour must have a price"],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, "A tour must have a description"],
    },
    imageCover: {
      type: String,
      required: [true, "A tour must have cover image"],
    },
    images: {
      type: [String],
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
    slug: String,
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// virtual properties
tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

// ========================== DOCUMENT MIDDLEWARE =====================================
// document middleware ( this is middleware)
// only runs before .save() and .create();
// it gonna run before an actual event
// that event in this case is 'save' event
// call back function will be called before an actual document is saves to database

// always must using next() function, if not it blocked

// 1
tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  // next(); if have not next() right here, can not process to next middleware
  next();
});

// if pass here will be run code below
//2
tourSchema.pre("save", function (next) {
  console.log("=======Will save document...==============");
  // next(); if have not next() right here, can not process to next middleware
  next();
});

// post middleware are excuted after ALL the pre middleware function have completed
// it mean must completed 1 and 2
tourSchema.post("save", function (doc, next) {
  console.log(doc); // doc have already create
  next();
});

// ============================== QUERY MIDDLEWARE ====================================
// tourSchema.pre("find", function (next) {
// use regular expresion match all method start with find like find, findOne, findById,v.vv
tourSchema.pre(/^find/, function (next) {
  // only find tours have secretTour filed is false
  this.find({ secretTour: { $ne: true } });
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log({ docs });
  next();
});

// ================================== AGGREGATION MIDDLEWARE =================================
tourSchema.pre("aggregate", function (next) {
  console.log(this.pipeline());
  // add new operator
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;
