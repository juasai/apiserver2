const cartService = require('../services/cartService');

class CartController {
    async getAllCarts(req, res, next) {
        try {
            const carts = await cartService.getAllCarts();
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
            const cart = await cartService.getCartById(req.params.cid);
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
            const newCart = await cartService.createCart();
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
            const updatedCart = await cartService.addProductToCart(req.params.cid, req.params.pid);
            res.json({
                status: 'success',
                data: updatedCart
            });
        } catch (error) {
            next(error);
        }
    }

    async updateCart(req, res, next) {
        try {
            const { products } = req.body;
            if (!Array.isArray(products)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Products must be an array'
                });
            }

            const updatedCart = await cartService.updateCart(req.params.cid, products);
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
            const { quantity } = req.body;
            const updatedCart = await cartService.updateProductQuantity(req.params.cid, req.params.pid, quantity);
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
            const updatedCart = await cartService.removeProductFromCart(req.params.cid, req.params.pid);
            res.json({
                status: 'success',
                data: updatedCart
            });
        } catch (error) {
            next(error);
        }
    }

    async clearCart(req, res, next) {
        try {
            const updatedCart = await cartService.clearCart(req.params.cid);
            res.json({
                status: 'success',
                data: updatedCart
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CartController();
