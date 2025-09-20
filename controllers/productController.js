const Product = require('../models/Product');
const Supplier = require('../models/Supplier');
const { validationResult } = require('express-validator');

// Display list of all products
exports.product_list = async (req, res, next) => {
  try {
    const products = await Product.find({}).populate('supplier').sort({ name: 1 });
    res.render('products/index', { 
      title: 'Product List', 
      products: products 
    });
  } catch (err) {
    next(err);
  }
};

// Display detail page for a specific product
exports.product_detail = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('supplier');
    
    if (!product) {
      const err = new Error('Product not found');
      err.status = 404;
      return next(err);
    }
    
    res.render('products/detail', { 
      title: 'Product Detail', 
      product: product
    });
  } catch (err) {
    next(err);
  }
};

// Display product create form on GET
exports.product_create_get = async (req, res, next) => {
  try {
    const suppliers = await Supplier.find({}).sort({ name: 1 });
    res.render('products/new', { 
      title: 'Create Product',
      product: null,
      suppliers: suppliers,
      errors: null
    });
  } catch (err) {
    next(err);
  }
};

// Handle product create on POST
exports.product_create_post = async (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const suppliers = await Supplier.find({}).sort({ name: 1 });
    return res.render('products/new', {
      title: 'Create Product',
      product: req.body,
      suppliers: suppliers,
      errors: errors.array()
    });
  }
  
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      supplier: req.body.supplier
    });
    
    await product.save();
    req.flash('success', 'Product created successfully');
    res.redirect(product.url);
  } catch (err) {
    next(err);
  }
};

// Display product delete form on GET
exports.product_delete_get = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('supplier');
    
    if (!product) {
      req.flash('error', 'Product not found');
      res.redirect('/products');
      return;
    }
    
    res.render('products/delete', {
      title: 'Delete Product',
      product: product
    });
  } catch (err) {
    next(err);
  }
};

// Handle product delete on POST
exports.product_delete_post = async (req, res, next) => {
  try {
    await Product.findByIdAndRemove(req.params.id);
    req.flash('success', 'Product deleted successfully');
    res.redirect('/products');
  } catch (err) {
    next(err);
  }
};

// Display product update form on GET
exports.product_update_get = async (req, res, next) => {
  try {
    const [product, suppliers] = await Promise.all([
      Product.findById(req.params.id).populate('supplier'),
      Supplier.find({}).sort({ name: 1 })
    ]);
    
    if (!product) {
      const err = new Error('Product not found');
      err.status = 404;
      return next(err);
    }
    
    res.render('products/edit', {
      title: 'Update Product',
      product: product,
      suppliers: suppliers,
      errors: null
    });
  } catch (err) {
    next(err);
  }
};

// Handle product update on POST
exports.product_update_post = async (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const [product, suppliers] = await Promise.all([
      Product.findById(req.params.id).populate('supplier'),
      Supplier.find({}).sort({ name: 1 })
    ]);
    
    return res.render('products/edit', {
      title: 'Update Product',
      product: product,
      suppliers: suppliers,
      errors: errors.array()
    });
  }
  
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      supplier: req.body.supplier,
      _id: req.params.id
    });
    
    await Product.findByIdAndUpdate(req.params.id, product, {});
    req.flash('success', 'Product updated successfully');
    res.redirect(product.url);
  } catch (err) {
    next(err);
  }
};
