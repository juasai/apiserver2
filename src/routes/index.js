const express = require('express');
const router = express.Router();
const productRoutes = require('./productRoutes');
const cartRoutes = require('./cartRoutes');

router.use('/products', productRoutes);
router.use('/carts', cartRoutes);

router.get('/health', (req, res) => {
    res.json({
        status: 'success',
        message: 'API is running',
        timestamp: new Date().toISOString()
    });
});

module.exports = router;
