const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  // user ke pass token nahi hai toh logged in nahi hai
  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  // users token and db token verify karo 
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  // hai to usko req.user mein store karo like user can access now 
  req.user = await User.findById(decodedData.id);

  next();
});

exports.authorizeRoles = (...roles) => {
  // roles = [admin] hai joh hamne authjs se bheja hai
  return (req, res, next) => {  
    
    // agar admin != user ka role protected route access karne ki try karra then nichewal error bhejo
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};
