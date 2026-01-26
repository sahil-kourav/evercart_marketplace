const { body, validationResult, param } = require("express-validator");
const mongoose = require("mongoose");

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Validation error", errors: errors.array() });
  }
  next();
}

const addItemToCartValidation = [
  body("productId")
    .exists()
    .withMessage("productId is required")
    .isMongoId()
    .withMessage("productId must be a valid Mongo ID"),

  body("qty")
    .exists()
    .withMessage("qty is required")
    .isInt({ min: 1 })
    .withMessage("qty must be an integer greater than 0"),
  handleValidationErrors,
];


const validateUpdateCartItem = [
    param('productId')
        .isString()
        .withMessage('Product ID must be a string')
        .custom(value => mongoose.Types.ObjectId.isValid(value))
        .withMessage('Invalid Product ID format'),
    body('qty')
        .isInt({ gt: 0 })
        .withMessage('Quantity must be a positive integer'),
    handleValidationErrors,
];

module.exports = {
  addItemToCartValidation,
  validateUpdateCartItem,
};
