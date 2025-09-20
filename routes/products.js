const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const productController = require('../controllers/productController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Validation rules
const productValidation = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Product name is required')
    .isLength({ max: 100 })
    .withMessage('Product name cannot exceed 100 characters'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('quantity')
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer'),
  body('supplier')
    .isMongoId()
    .withMessage('Please select a valid supplier')
];

// All product routes require authentication and admin role
router.use(isAuthenticated);
router.use(isAdmin);

// GET request for creating a product
router.get('/create', productController.product_create_get);

// POST request for creating a product
router.post('/create', productValidation, productController.product_create_post);

// GET request to delete a product
router.get('/:id/delete', productController.product_delete_get);

// POST request to delete a product
router.post('/:id/delete', productController.product_delete_post);

// GET request to update a product
router.get('/:id/update', productController.product_update_get);

// POST request to update a product
router.post('/:id/update', productValidation, productController.product_update_post);

// GET request for one product
router.get('/:id', productController.product_detail);

// GET request for list of all products
router.get('/', productController.product_list);

module.exports = router;
