const Supplier = require('../models/Supplier');
const Product = require('../models/Product');
const { validationResult } = require('express-validator');

// Display list of all suppliers
exports.supplier_list = async (req, res, next) => {
  try {
    const suppliers = await Supplier.find({}).sort({ name: 1 });
    res.render('suppliers/index', { 
      title: 'Supplier List', 
      suppliers: suppliers 
    });
  } catch (err) {
    next(err);
  }
};

// Display detail page for a specific supplier
exports.supplier_detail = async (req, res, next) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    const products = await Product.find({ supplier: req.params.id }).populate('supplier');
    
    if (!supplier) {
      const err = new Error('Supplier not found');
      err.status = 404;
      return next(err);
    }
    
    res.render('suppliers/detail', { 
      title: 'Supplier Detail', 
      supplier: supplier,
      products: products
    });
  } catch (err) {
    next(err);
  }
};

// Display supplier create form on GET
exports.supplier_create_get = (req, res) => {
  res.render('suppliers/new', { 
    title: 'Create Supplier',
    supplier: null,
    errors: null
  });
};

// Handle supplier create on POST
exports.supplier_create_post = async (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.render('suppliers/new', {
      title: 'Create Supplier',
      supplier: req.body,
      errors: errors.array()
    });
  }
  
  try {
    const supplier = new Supplier({
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone
    });
    
    await supplier.save();
    req.flash('success', 'Supplier created successfully');
    res.redirect(supplier.url);
  } catch (err) {
    next(err);
  }
};

// Display supplier delete form on GET
exports.supplier_delete_get = async (req, res, next) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    const products = await Product.find({ supplier: req.params.id });
    
    if (!supplier) {
      req.flash('error', 'Supplier not found');
      res.redirect('/suppliers');
      return;
    }
    
    res.render('suppliers/delete', {
      title: 'Delete Supplier',
      supplier: supplier,
      products: products
    });
  } catch (err) {
    next(err);
  }
};

// Handle supplier delete on POST
exports.supplier_delete_post = async (req, res, next) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    const products = await Product.find({ supplier: req.params.id });
    
    if (products.length > 0) {
      req.flash('error', 'Cannot delete supplier with associated products');
      return res.render('suppliers/delete', {
        title: 'Delete Supplier',
        supplier: supplier,
        products: products
      });
    }
    
    await Supplier.findByIdAndRemove(req.params.id);
    req.flash('success', 'Supplier deleted successfully');
    res.redirect('/suppliers');
  } catch (err) {
    next(err);
  }
};

// Display supplier update form on GET
exports.supplier_update_get = async (req, res, next) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    
    if (!supplier) {
      const err = new Error('Supplier not found');
      err.status = 404;
      return next(err);
    }
    
    res.render('suppliers/edit', {
      title: 'Update Supplier',
      supplier: supplier,
      errors: null
    });
  } catch (err) {
    next(err);
  }
};

// Handle supplier update on POST
exports.supplier_update_post = async (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const supplier = await Supplier.findById(req.params.id);
    return res.render('suppliers/edit', {
      title: 'Update Supplier',
      supplier: supplier,
      errors: errors.array()
    });
  }
  
  try {
    const supplier = new Supplier({
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      _id: req.params.id
    });
    
    await Supplier.findByIdAndUpdate(req.params.id, supplier, {});
    req.flash('success', 'Supplier updated successfully');
    res.redirect(supplier.url);
  } catch (err) {
    next(err);
  }
};
