const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const supplierController = require('../controllers/supplierController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Validation rules
const supplierValidation = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Supplier name is required')
    .isLength({ max: 100 })
    .withMessage('Supplier name cannot exceed 100 characters'),
  body('address')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Supplier address is required')
    .isLength({ max: 200 })
    .withMessage('Address cannot exceed 200 characters'),
  body('phone')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Supplier phone is required')
    .matches(/^[0-9+\-\s()]+$/)
    .withMessage('Please enter a valid phone number')
];

// All supplier routes require authentication and admin role
router.use(isAuthenticated);
router.use(isAdmin);

// GET request for creating a supplier
router.get('/create', supplierController.supplier_create_get);

// POST request for creating a supplier
router.post('/create', supplierValidation, supplierController.supplier_create_post);

// GET request to delete a supplier
router.get('/:id/delete', supplierController.supplier_delete_get);

// POST request to delete a supplier
router.post('/:id/delete', supplierController.supplier_delete_post);

// GET request to update a supplier
router.get('/:id/update', supplierController.supplier_update_get);

// POST request to update a supplier
router.post('/:id/update', supplierValidation, supplierController.supplier_update_post);

// GET request for one supplier
router.get('/:id', supplierController.supplier_detail);

// GET request for list of all suppliers
router.get('/', supplierController.supplier_list);

module.exports = router;
