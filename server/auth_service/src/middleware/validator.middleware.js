const { body, validationResult } = require("express-validator");

const respondValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const registerUserValidation = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("phone")
    .isString()
    .withMessage("Phone number must be a string")
    .notEmpty()
    .withMessage("Phone number is required")
    .isLength({ min: 10 })
    .withMessage("Phone number must be at least 10 digits long"),

  body("fullName.firstName")
    .isString()
    .withMessage("First name must be a string")
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long"),

  body("fullName.lastName")
    .isString()
    .withMessage("Last name must be a string")
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters long"),

  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("Role must be either user or admin"),

  respondValidationErrors,
];

const loginUserValidation = [
  // At least one of email, username, or phone is required
  // (req, res, next) => {
  //   const { email, phone } = req.body;
  //   if (!email && !phone) {
  //     return res.status(400).json({
  //       errors: [
  //         {
  //           msg: "At least one of email or phone is required",
  //           param: "identifier",
  //           location: "body",
  //         },
  //       ],
  //     });
  //   }
  //   next();
  // },
  
  body("email")
    .optional()
    .isEmail()
    .withMessage("Please provide a valid email address"),

  body("phone")
    .optional()
    .isString()
    .withMessage("Phone number must be a string")
    .isLength({ min: 10 })
    .withMessage("Phone number must be at least 10 digits long"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  respondValidationErrors,
];

const userAddressValidation = [
  body("street")
    .isString()
    .withMessage("Street must be a string")
    .notEmpty()
    .withMessage("Street is required"),
  body("city")
    .isString()
    .withMessage("City must be a string")
    .notEmpty()
    .withMessage("City is required"),
  body("state")
    .isString()
    .withMessage("State must be a string")
    .notEmpty()
    .withMessage("State is required"),
body("zip")
  .isString()
  .withMessage("ZIP/PIN code must be a string")
  .matches(/^\d{6}$/)
  .withMessage("Please provide a valid 6-digit PIN code")
  .notEmpty()
  .withMessage("ZIP/PIN code is required"),

  body("country")
    .isString()
    .withMessage("Country must be a string")
    .notEmpty()
    .withMessage("Country is required"),
  respondValidationErrors,
];

module.exports = {
  registerUserValidation,
  loginUserValidation,
  userAddressValidation,
};
