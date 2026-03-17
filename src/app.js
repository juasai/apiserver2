const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');
const routes = require('./routes');
const viewsRoutes = require('./routes/viewsRoutes');

const app = express();

// Handlebars configuration
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// View Routes (at root)
app.use('/', viewsRoutes);

// API Routes
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
