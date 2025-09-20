const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

// API endpoint for AJAX search
router.get('/search', async (req, res) => {
    try {
        const { q: searchTerm, supplier } = req.query;
        let query = {};

        // Build search query
        if (searchTerm) {
            query.name = { $regex: searchTerm, $options: 'i' };
        }

        if (supplier && supplier !== '') {
            query.supplier = supplier;
        }

        // Execute search
        const products = await Product.find(query)
            .populate('supplier', 'name')
            .sort({ name: 1 })
            .limit(50); // Limit results for performance

        // Format results for frontend
        const formattedProducts = products.map(product => ({
            _id: product._id,
            name: product.name,
            price: product.price.toFixed(2),
            quantity: product.quantity,
            totalValue: product.totalValue.toFixed(2),
            supplier: {
                _id: product.supplier._id,
                name: product.supplier.name
            }
        }));

        res.json({
            success: true,
            products: formattedProducts,
            count: formattedProducts.length
        });

    } catch (error) {
        console.error('Search API error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: 'An error occurred while searching products'
        });
    }
});

// API endpoint to get all suppliers (for dropdown)
router.get('/suppliers', async (req, res) => {
    try {
        const suppliers = await Supplier.find({})
            .select('_id name')
            .sort({ name: 1 });

        res.json({
            success: true,
            suppliers: suppliers
        });

    } catch (error) {
        console.error('Suppliers API error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: 'An error occurred while fetching suppliers'
        });
    }
});

// API endpoint to get product statistics
router.get('/stats', async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const totalSuppliers = await Supplier.countDocuments();
        const totalValue = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: '$totalValue' }
                }
            }
        ]);

        const lowStockProducts = await Product.countDocuments({
            quantity: { $lt: 10 }
        });

        res.json({
            success: true,
            stats: {
                totalProducts,
                totalSuppliers,
                totalValue: totalValue[0]?.total || 0,
                lowStockProducts
            }
        });

    } catch (error) {
        console.error('Stats API error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: 'An error occurred while fetching statistics'
        });
    }
});

module.exports = router;
