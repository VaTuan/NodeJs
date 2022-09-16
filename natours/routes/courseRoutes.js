const express = require("express");
const courseController = require("../controllers/courseController");

const router = express.Router();

// add param middleware to validate if id is not valid
// router.param("id", productController.checkID);

router
  .route("/")
  .get(courseController.getAllCourses)
  .post(courseController.createCourse);

router.route("/trash").get(courseController.getCourseInTrash);

router
  .route("/:slug")
  .get(courseController.getCourseBySlug)
  .put(courseController.updateCourse)
  .delete(courseController.deleteCourse);

router.route("/:slug/restore").patch(courseController.restoreCourse);
router.route("/:slug/force").delete(courseController.forceDestroy);

module.exports = router;
