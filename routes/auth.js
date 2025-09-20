const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { isAuthenticated, isNotAuthenticated } = require('../middleware/auth');

// Validation rules for login
const loginValidation = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username or email is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Validation rules for registration
const registerValidation = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  body('phone')
    .trim()
    .matches(/^[0-9+\-\s()]+$/)
    .withMessage('Please enter a valid phone number')
];

// Validation rules for forgot password
const forgotValidation = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail()
];

// Validation rules for profile update
const profileValidation = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('phone')
    .trim()
    .matches(/^[0-9+\-\s()]+$/)
    .withMessage('Please enter a valid phone number')
];

// GET routes
router.get('/login', isNotAuthenticated, authController.login_get);
router.get('/register', isNotAuthenticated, authController.register_get);
router.get('/forgot', isNotAuthenticated, authController.forgot_get);
router.get('/logout', authController.logout);
router.get('/profile', isAuthenticated, authController.profile_get);

// POST routes
router.post('/login', isNotAuthenticated, loginValidation, authController.login_post);
router.post('/register', isNotAuthenticated, registerValidation, authController.register_post);
router.post('/forgot', isNotAuthenticated, forgotValidation, authController.forgot_post);
router.post('/profile', isAuthenticated, profileValidation, authController.profile_update);

module.exports = router;
