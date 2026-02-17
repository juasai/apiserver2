const express = require('express');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');
const routes = require('./routes');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Routes
app.use('/api', routes);

// Root route
app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'API Server is running',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            products: '/api/products',
            carts: '/api/carts'
        }
    });
});

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

module.exports = app;
