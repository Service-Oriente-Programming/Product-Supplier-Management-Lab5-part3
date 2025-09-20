const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');
const { optionalAuth } = require('../middleware/auth');

// Home page with search functionality
router.get('/', optionalAuth, async (req, res, next) => {
  try {
    const { search, supplier } = req.query;
    let query = {};
    
    // Search by product name
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    // Filter by supplier
    if (supplier) {
      query.supplier = supplier;
    }
    
    // Get products with supplier information
    const products = await Product.find(query)
      .populate('supplier')
      .sort({ name: 1 })
      .limit(50); // Limit results for performance
    
    // Get all suppliers for the filter dropdown
    const suppliers = await Supplier.find({}).sort({ name: 1 });
    
    res.render('index', {
      title: 'Home',
      products: products,
      suppliers: suppliers,
      searchQuery: search || '',
      selectedSupplier: supplier || '',
      message: req.flash('success')[0] || req.flash('error')[0] || req.flash('info')[0]
    });
    
  } catch (err) {
    next(err);
  }
});

// API endpoint for product search (for AJAX)
router.get('/api/search', async (req, res, next) => {
  try {
    const { q, supplier } = req.query;
    let query = {};
    
    if (q) {
      query.name = { $regex: q, $options: 'i' };
    }
    
    if (supplier) {
      query.supplier = supplier;
    }
    
    const products = await Product.find(query)
      .populate('supplier')
      .sort({ name: 1 })
      .limit(20);
    
    res.json({
      success: true,
      products: products
    });
    
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// API endpoint for supplier list (for AJAX)
router.get('/api/suppliers', async (req, res, next) => {
  try {
    const suppliers = await Supplier.find({}).sort({ name: 1 });
    
    res.json({
      success: true,
      suppliers: suppliers
    });
    
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

module.exports = router;
