const express = require("express");
const tourController = require("../controllers/tourController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, tourController.getAllTours)
  .post(authController.protect, tourController.createTour);

router
  .route("/top-3-cheap")
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route("/tour-stats").get(tourController.getTourStats);
router.route("/monthy-plan/:year").get(tourController.getMonthyPlan);
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.deleteTour
  );

module.exports = router;
