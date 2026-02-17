const fs = require('fs');
const path = require('path');

class Cart {
    constructor(filePath) {
        this.filePath = filePath;
        this.carts = [];
        this.loadCarts();
    }

    loadCarts() {
        try {
            if (fs.existsSync(this.filePath)) {
                const data = fs.readFileSync(this.filePath, 'utf-8');
                this.carts = JSON.parse(data);
            }
        } catch (error) {
            console.error('Error loading carts:', error);
            this.carts = [];
        }
    }

    saveCarts() {
        try {
            const dir = path.dirname(this.filePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(this.filePath, JSON.stringify(this.carts, null, 2));
        } catch (error) {
            console.error('Error saving carts:', error);
            throw error;
        }
    }

    getAll() {
        return this.carts;
    }

    getById(id) {
        return this.carts.find(cart => cart.id === id);
    }

    create() {
        const newCart = {
            id: this.carts.length > 0 ? Math.max(...this.carts.map(c => c.id)) + 1 : 1,
            products: [],
            createdAt: new Date().toISOString()
        };
        this.carts.push(newCart);
        this.saveCarts();
        return newCart;
    }

    addProduct(cartId, productId) {
        const cart = this.getById(cartId);
        if (cart) {
            const productInCart = cart.products.find(p => p.product === productId);
            if (productInCart) {
                productInCart.quantity += 1;
            } else {
                cart.products.push({ product: productId, quantity: 1 });
            }
            cart.updatedAt = new Date().toISOString();
            this.saveCarts();
            return cart;
        }
        return null;
    }

    updateProductQuantity(cartId, productId, quantity) {
        const cart = this.getById(cartId);
        if (cart) {
            const productInCart = cart.products.find(p => p.product === productId);
            if (productInCart) {
                productInCart.quantity = quantity;
                cart.updatedAt = new Date().toISOString();
                this.saveCarts();
                return cart;
            }
        }
        return null;
    }

    removeProduct(cartId, productId) {
        const cart = this.getById(cartId);
        if (cart) {
            cart.products = cart.products.filter(p => p.product !== productId);
            cart.updatedAt = new Date().toISOString();
            this.saveCarts();
            return cart;
        }
        return null;
    }

    delete(id) {
        const cartIndex = this.carts.findIndex(cart => cart.id === id);
        if (cartIndex !== -1) {
            const deletedCart = this.carts.splice(cartIndex, 1)[0];
            this.saveCarts();
            return deletedCart;
        }
        return null;
    }
}

module.exports = Cart;
