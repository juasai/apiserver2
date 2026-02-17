const Product = require('../models/Product');
const path = require('path');

const productModel = new Product(path.join(__dirname, '../../data/products.json'));

class ProductService {
    getAllProducts() {
        return productModel.getAll();
    }

    getProductById(id) {
        const product = productModel.getById(id);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }

    createProduct(productData) {
        const { title, description, price, code, stock, category } = productData;
        
        if (!title || !description || !price || !code || !stock || !category) {
            throw new Error('All fields are required: title, description, price, code, stock, category');
        }

        if (typeof price !== 'number' || price <= 0) {
            throw new Error('Price must be a positive number');
        }

        if (typeof stock !== 'number' || stock < 0) {
            throw new Error('Stock must be a non-negative number');
        }

        const products = productModel.getAll();
        const existingProduct = products.find(p => p.code === code);
        if (existingProduct) {
            throw new Error('Product with this code already exists');
        }

        return productModel.create(productData);
    }

    updateProduct(id, updatedFields) {
        const product = productModel.getById(id);
        if (!product) {
            throw new Error('Product not found');
        }

        if (updatedFields.code) {
            const products = productModel.getAll();
            const existingProduct = products.find(p => p.code === updatedFields.code && p.id !== id);
            if (existingProduct) {
                throw new Error('Product with this code already exists');
            }
        }

        if (updatedFields.price !== undefined && (typeof updatedFields.price !== 'number' || updatedFields.price <= 0)) {
            throw new Error('Price must be a positive number');
        }

        if (updatedFields.stock !== undefined && (typeof updatedFields.stock !== 'number' || updatedFields.stock < 0)) {
            throw new Error('Stock must be a non-negative number');
        }

        return productModel.update(id, updatedFields);
    }

    deleteProduct(id) {
        const product = productModel.getById(id);
        if (!product) {
            throw new Error('Product not found');
        }
        return productModel.delete(id);
    }
}

module.exports = new ProductService();
