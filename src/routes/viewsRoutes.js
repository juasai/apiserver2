const express = require('express');
const router = express.Router();
const productService = require('../services/productService');
const cartService = require('../services/cartService');

router.get('/products', async (req, res) => {
    try {
        const { limit, page, sort, query, status } = req.query;

        const filterQuery = status || query || null;

        const options = {
            limit: limit ? parseInt(limit, 10) : 10,
            page: page ? parseInt(page, 10) : 1,
            sort: sort || null,
            query: filterQuery
        };

        const result = await productService.getAllProducts(options);

        const buildLink = (p) => {
            if (!p) return null;
            const params = new URLSearchParams();
            params.set('page', p);
            if (limit) params.set('limit', limit);
            if (sort) params.set('sort', sort);
            if (query) params.set('query', query);
            if (status) params.set('status', status);
            return `/products?${params.toString()}`;
        };

        res.render('products', {
            title: 'Productos',
            products: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? buildLink(result.prevPage) : null,
            nextLink: result.hasNextPage ? buildLink(result.nextPage) : null,
            limit: options.limit,
            query: query || '',
            statusTrue: status === 'true',
            statusFalse: status === 'false',
            sortAsc: sort === 'asc',
            sortDesc: sort === 'desc'
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

router.get('/products/:pid', async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.pid);
        res.render('productDetail', {
            title: product.title,
            product
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

router.get('/carts/:cid', async (req, res) => {
    try {
        const cart = await cartService.getCartById(req.params.cid);
        res.render('cart', {
            title: 'Carrito',
            cart
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

router.get('/realtimeproducts', async (req, res) => {
    try {
        const result = await productService.getAllProducts();
        res.render('realTimeProducts', {
            title: 'Productos en Tiempo Real',
            products: result.docs
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

module.exports = router;
