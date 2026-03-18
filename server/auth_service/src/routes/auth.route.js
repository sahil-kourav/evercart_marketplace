const express = require('express');
const validator = require('../middleware/validator.middleware');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

// POST /api/auth/register
router.post("/register", validator.registerUserValidation, authController.registerUser);

// POST /api/auth/login
router.post("/login", validator.loginUserValidation, authController.loginUser);

// GET /api/auth/me
router.get('/me', authMiddleware.authMiddleware, authController.getCurrentUser);

// POST /api/auth/logout
router.post("/logout", authController.logoutUser);

// POST /api/auth/login-admin
router.post('/login-admin', validator.adminLoginValidation, authController.adminLogin);

// GET /users/me/addresses localhost:3000/api/auth/users/me/addresses
router.get('/users/me/addresses', authMiddleware.authMiddleware, authController.getUserAddresses);
router.post('/users/me/addresses', authMiddleware.authMiddleware, validator.userAddressValidation, authController.addUserAddress);
router.delete('/users/me/addresses/:addressId', authMiddleware.authMiddleware, authController.deleteUserAddress);
module.exports = router;
