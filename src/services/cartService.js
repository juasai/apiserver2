const Cart = require('../models/Cart');
const Product = require('../models/Product');
const path = require('path');

const cartModel = new Cart(path.join(__dirname, '../../data/carts.json'));
const productModel = new Product(path.join(__dirname, '../../data/products.json'));

class CartService {
    getAllCarts() {
        return cartModel.getAll();
    }

    getCartById(id) {
        const cart = cartModel.getById(id);
        if (!cart) {
            throw new Error('Cart not found');
        }
        return cart;
    }

    createCart() {
        return cartModel.create();
    }

    addProductToCart(cartId, productId) {
        const cart = cartModel.getById(cartId);
        if (!cart) {
            throw new Error('Cart not found');
        }

        const product = productModel.getById(productId);
        if (!product) {
            throw new Error('Product not found');
        }

        return cartModel.addProduct(cartId, productId);
    }

    updateProductQuantity(cartId, productId, quantity) {
        const cart = cartModel.getById(cartId);
        if (!cart) {
            throw new Error('Cart not found');
        }

        const product = productModel.getById(productId);
        if (!product) {
            throw new Error('Product not found');
        }

        if (typeof quantity !== 'number' || quantity <= 0) {
            throw new Error('Quantity must be a positive number');
        }

        const result = cartModel.updateProductQuantity(cartId, productId, quantity);
        if (!result) {
            throw new Error('Product not found in cart');
        }

        return result;
    }

    removeProductFromCart(cartId, productId) {
        const cart = cartModel.getById(cartId);
        if (!cart) {
            throw new Error('Cart not found');
        }

        return cartModel.removeProduct(cartId, productId);
    }

    deleteCart(id) {
        const cart = cartModel.getById(id);
        if (!cart) {
            throw new Error('Cart not found');
        }
        return cartModel.delete(id);
    }
}

module.exports = new CartService();
