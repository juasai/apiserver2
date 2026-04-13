const Cart = require('../models/Cart');
const Product = require('../models/Product');

class CartService {
    async getAllCarts() {
        return await Cart.find().lean();
    }

    async getCartById(id) {
        const cart = await Cart.findById(id).populate('products.product').lean();
        if (!cart) {
            throw new Error('Cart not found');
        }
        return cart;
    }

    async createCart() {
        return await Cart.create({ products: [] });
    }

    async addProductToCart(cartId, productId) {
        const cart = await Cart.findById(cartId);
        if (!cart) {
            throw new Error('Cart not found');
        }

        const product = await Product.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }

        const productInCart = cart.products.find(p => p.product.toString() === productId);
        if (productInCart) {
            productInCart.quantity += 1;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }

        await cart.save();
        return cart;
    }

    async updateCart(cartId, products) {
        const cart = await Cart.findById(cartId);
        if (!cart) {
            throw new Error('Cart not found');
        }

        cart.products = products;
        await cart.save();
        return cart;
    }

    async updateProductQuantity(cartId, productId, quantity) {
        const cart = await Cart.findById(cartId);
        if (!cart) {
            throw new Error('Cart not found');
        }

        if (typeof quantity !== 'number' || quantity <= 0) {
            throw new Error('Quantity must be a positive number');
        }

        const productInCart = cart.products.find(p => p.product.toString() === productId);
        if (!productInCart) {
            throw new Error('Product not found in cart');
        }

        productInCart.quantity = quantity;
        await cart.save();
        return cart;
    }

    async removeProductFromCart(cartId, productId) {
        const cart = await Cart.findById(cartId);
        if (!cart) {
            throw new Error('Cart not found');
        }

        cart.products = cart.products.filter(p => p.product.toString() !== productId);
        await cart.save();
        return cart;
    }

    async clearCart(cartId) {
        const cart = await Cart.findById(cartId);
        if (!cart) {
            throw new Error('Cart not found');
        }

        cart.products = [];
        await cart.save();
        return cart;
    }
}

module.exports = new CartService();
