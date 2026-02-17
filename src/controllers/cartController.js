const cartService = require('../services/cartService');

class CartController {
    async getAllCarts(req, res, next) {
        try {
            const carts = cartService.getAllCarts();
            res.json({
                status: 'success',
                data: carts
            });
        } catch (error) {
            next(error);
        }
    }

    async getCartById(req, res, next) {
        try {
            const cartId = parseInt(req.params.cid, 10);
            if (isNaN(cartId)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid cart ID'
                });
            }

            const cart = cartService.getCartById(cartId);
            res.json({
                status: 'success',
                data: cart
            });
        } catch (error) {
            next(error);
        }
    }

    async createCart(req, res, next) {
        try {
            const newCart = cartService.createCart();
            res.status(201).json({
                status: 'success',
                data: newCart
            });
        } catch (error) {
            next(error);
        }
    }

    async addProductToCart(req, res, next) {
        try {
            const cartId = parseInt(req.params.cid, 10);
            const productId = parseInt(req.params.pid, 10);

            if (isNaN(cartId) || isNaN(productId)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid cart ID or product ID'
                });
            }

            const updatedCart = cartService.addProductToCart(cartId, productId);
            res.json({
                status: 'success',
                data: updatedCart
            });
        } catch (error) {
            next(error);
        }
    }

    async updateProductQuantity(req, res, next) {
        try {
            const cartId = parseInt(req.params.cid, 10);
            const productId = parseInt(req.params.pid, 10);
            const { quantity } = req.body;

            if (isNaN(cartId) || isNaN(productId)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid cart ID or product ID'
                });
            }

            const updatedCart = cartService.updateProductQuantity(cartId, productId, quantity);
            res.json({
                status: 'success',
                data: updatedCart
            });
        } catch (error) {
            next(error);
        }
    }

    async removeProductFromCart(req, res, next) {
        try {
            const cartId = parseInt(req.params.cid, 10);
            const productId = parseInt(req.params.pid, 10);

            if (isNaN(cartId) || isNaN(productId)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid cart ID or product ID'
                });
            }

            const updatedCart = cartService.removeProductFromCart(cartId, productId);
            res.json({
                status: 'success',
                data: updatedCart
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteCart(req, res, next) {
        try {
            const cartId = parseInt(req.params.cid, 10);
            if (isNaN(cartId)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid cart ID'
                });
            }

            const deletedCart = cartService.deleteCart(cartId);
            res.json({
                status: 'success',
                data: deletedCart
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CartController();
