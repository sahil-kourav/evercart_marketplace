const { body, validationResult } = require("express-validator");

const respondValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const orderValidation = [
  body("shippingAddress.street")
    .isString()
    .withMessage("Street must be a string")
    .notEmpty()
    .withMessage("Street is required"),
  body("shippingAddress.city")
    .isString()
    .withMessage("City must be a string")
    .notEmpty()
    .withMessage("City is required"),
  body("shippingAddress.state")
    .isString()
    .withMessage("State must be a string")
    .notEmpty()
    .withMessage("State is required"),
  body("shippingAddress.zip")
    .isString()
    .withMessage("ZIP/PIN code must be a string")
    .matches(/^\d{6}$/)
    .withMessage("Please provide a valid 6-digit PIN code")
    .notEmpty()
    .withMessage("ZIP/PIN code is required"),

  body("shippingAddress.country")
    .isString()
    .withMessage("Country must be a string")
    .notEmpty()
    .withMessage("Country is required"),

  body("shippingAddress.phone")
    .isMobilePhone()
    .withMessage("Please provide a valid phone number")
    .isString()
    .withMessage("Phone number must be a string")
    .notEmpty()
    .withMessage("Phone number is required")
    .isLength({ min: 10 })
    .withMessage("Phone number must be at least 10 digits long"),

  respondValidationErrors,
];

module.exports = {
  orderValidation,
};
