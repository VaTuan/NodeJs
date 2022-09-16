const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");

const { Schema } = mongoose;

const Course = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    // auto generator slug
    slug: { type: String, slug: "title", unique: true },
  },
  {
    timestamps: true,
  }
);

// Add plugin
mongoose.plugin(slug);

// apply soft delete
Course.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("Course", Course);
