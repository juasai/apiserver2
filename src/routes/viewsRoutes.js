const express = require('express');
const router = express.Router();
const productService = require('../services/productService');

router.get('/home', (req, res) => {
    try {
        const products = productService.getAllProducts();
        res.render('home', {
            title: 'Lista de Productos',
            products: products
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

router.get('/realtimeproducts', (req, res) => {
    try {
        const products = productService.getAllProducts();
        res.render('realTimeProducts', {
            title: 'Productos en Tiempo Real',
            products: products
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

module.exports = router;
