const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/User");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data

  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates, Please use /updateMyPassword",
        400
      )
    );
  }

  // 2 ) Filtered out unwanted fileds names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "name", "email");
  // it should same below, not include password, passwordConfirm, v..v
  //   {
  //     name : "tuanva",
  //     email : "vuanhtuan@gmail.com"
  //   }

  // 3 ) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
