const productService = require('../services/productService');

class ProductController {
    async getAllProducts(req, res, next) {
        try {
            const products = productService.getAllProducts();
            res.json({
                status: 'success',
                data: products
            });
        } catch (error) {
            next(error);
        }
    }

    async getProductById(req, res, next) {
        try {
            const productId = parseInt(req.params.pid, 10);
            if (isNaN(productId)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid product ID'
                });
            }

            const product = productService.getProductById(productId);
            res.json({
                status: 'success',
                data: product
            });
        } catch (error) {
            next(error);
        }
    }

    async createProduct(req, res, next) {
        try {
            const newProduct = productService.createProduct(req.body);
            res.status(201).json({
                status: 'success',
                data: newProduct
            });
        } catch (error) {
            next(error);
        }
    }

    async updateProduct(req, res, next) {
        try {
            const productId = parseInt(req.params.pid, 10);
            if (isNaN(productId)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid product ID'
                });
            }

            const updatedProduct = productService.updateProduct(productId, req.body);
            res.json({
                status: 'success',
                data: updatedProduct
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const productId = parseInt(req.params.pid, 10);
            if (isNaN(productId)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid product ID'
                });
            }

            const deletedProduct = productService.deleteProduct(productId);
            res.json({
                status: 'success',
                data: deletedProduct
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ProductController();
