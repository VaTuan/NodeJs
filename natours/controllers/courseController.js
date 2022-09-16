const Course = require("../models/Course");

class CourseController {
  // [GET] /courses
  getAllCourses(req, res, next) {
    Promise.all([Course.find({}), Course.countDocuments()])
      .then(([courses, count]) => {
        res.status(200).json({
          data: courses,
          count,
        });
      })
      .catch(next);

    // Course.find({}, (error, courses) => {
    //   if (!error) {
    //     res.json({
    //       data: courses,
    //     });
    //   } else {
    //     res.status(400).json({
    //       message: "error",
    //     });
    //   }
    // });
  }

  // [POST] /courses
  createCourse(req, res, next) {
    const formData = req.body;
    const course = new Course(formData);
    course
      .save()
      .then((_course) =>
        res.status(201).json({
          data: _course,
          message: "success",
        })
      )
      .catch(() => {
        res.status(400).json({
          message: "create fail",
        });
        next();
      });
  }

  // [GET] /courses/:slug
  getCourseBySlug(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => res.status(200).json({ data: course }))
      .catch(next);
  }

  // [PUT] /courses/:slug
  updateCourse(req, res, next) {
    Course.updateOne({ _id: req.params.slug }, req.body)
      .then(() => {
        res.status(200).json({
          message: "update success",
        });
      })
      .catch(() => {
        res.status(400).json({
          message: "update fail",
        });
        next();
      });
  }

  // [DELETE] /courses/:slug
  // Course.delete is provided by mongoose-delete
  // in spite of the course have been deleted, but it have already save on database, it has add one field as deleted: true
  // therefore you can restore it very easy
  // remember that it acctually hasn't been deleted
  deleteCourse(req, res, next) {
    Course.delete({ _id: req.params.slug }, req.body)
      .then(() => {
        res.status(200).json({
          message: "delete success",
        });
      })
      .catch(() => {
        res.status(400).json({
          message: "delete fail",
        });
        next();
      });
  }

  // [GET] /courses/trash
  // Course.findDeleted is provided by mongoose-delete
  getCourseInTrash(req, res, next) {
    Promise.all([Course.findDeleted({}), Course.countDocumentsDeleted()])
      .then(([courses, deletedCount]) => {
        res.status(200).json({
          data: courses,
          deletedCount,
        });
      })
      .catch(next);
    // Course.countDocumentsDeleted();
    // Course.findDeleted({})
    //   .then((_courses) => {
    //     res.status(200).json({
    //       data: _courses,
    //     });
    //   })
    //   .catch(next);
  }

  // [PATCH] /courses/:slug/restore
  // because  i just update one field that i using PATCH method
  // Course.restore is provided by mongoose-delete
  restoreCourse(req, res, next) {
    Course.restore({
      _id: req.params.slug,
    })
      .then(() => {
        res.status(200).json({
          message: "restore course success !",
        });
      })
      .catch(next);
  }

  // [DELETE] /courses/:slug/force
  // delete forever
  forceDestroy(req, res, next) {
    Course.deleteOne({
      _id: req.params.slug,
    })
      .then(() => {
        res.status(200).json({
          message: "you just force delete !, so you can not restore field",
        });
      })
      .catch(next);
  }
}

module.exports = new CourseController();
