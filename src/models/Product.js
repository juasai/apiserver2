const fs = require('fs');
const path = require('path');

class Product {
    constructor(filePath) {
        this.filePath = filePath;
        this.products = [];
        this.loadProducts();
    }

    loadProducts() {
        try {
            if (fs.existsSync(this.filePath)) {
                const data = fs.readFileSync(this.filePath, 'utf-8');
                this.products = JSON.parse(data);
            }
        } catch (error) {
            console.error('Error loading products:', error);
            this.products = [];
        }
    }

    saveProducts() {
        try {
            const dir = path.dirname(this.filePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.error('Error saving products:', error);
            throw error;
        }
    }

    getAll() {
        return this.products;
    }

    getById(id) {
        return this.products.find(product => product.id === id);
    }

    create(productData) {
        const newProduct = {
            id: this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1,
            ...productData,
            createdAt: new Date().toISOString()
        };
        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }

    update(id, updatedFields) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            this.products[productIndex] = { 
                ...this.products[productIndex], 
                ...updatedFields,
                id: this.products[productIndex].id,
                updatedAt: new Date().toISOString()
            };
            this.saveProducts();
            return this.products[productIndex];
        }
        return null;
    }

    delete(id) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            const deletedProduct = this.products.splice(productIndex, 1)[0];
            this.saveProducts();
            return deletedProduct;
        }
        return null;
    }
}

module.exports = Product;
