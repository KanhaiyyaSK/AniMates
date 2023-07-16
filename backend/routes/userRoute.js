const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

//need to import this inorder to use the router
const router = express.Router();

//done
router.route("/register").post(registerUser);

//done
router.route("/login").post(loginUser);

// notworkign yet problem in sending the emails
router.route("/password/forgot").post(forgotPassword);

// don't know hot check it will check later
router.route("/password/reset/:token").put(resetPassword);

//done
router.route("/logout").get(logout);

//done
router.route("/me").get(isAuthenticatedUser, getUserDetails);

//done
router.route("/password/update").put(isAuthenticatedUser, updatePassword);

//done
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

//done
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

  //done
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
