const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  quantity: {
    type: Number,
    required: [true, 'Product quantity is required'],
    min: [0, 'Quantity cannot be negative'],
    default: 0
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: [true, 'Product must belong to a supplier']
  }
}, {
  timestamps: true
});

// Virtual for product's URL
productSchema.virtual('url').get(function() {
  return `/products/${this._id}`;
});

// Virtual for total value (price * quantity)
productSchema.virtual('totalValue').get(function() {
  return this.price * this.quantity;
});

// Ensure virtual fields are serialized
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

// Index for better query performance
productSchema.index({ supplier: 1 });
productSchema.index({ name: 1 });

module.exports = mongoose.model('Product', productSchema);
