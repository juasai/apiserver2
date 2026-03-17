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
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger);

// Favicon routes
app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/carrito-de-compras.png'));
});

app.get('/carrito-de-compras.png', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/carrito-de-compras.png'));
});

// View Routes (at root)
app.use('/', viewsRoutes);

// API Routes
app.use('/api', routes);

// Root route - Home page with all endpoints
app.get('/', (req, res) => {
    res.render('home', {
        title: 'API Server - Inicio',
        products: [],
        showInfo: true
    });
});

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

module.exports = app;
