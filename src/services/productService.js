const Product = require('../models/Product');

class ProductService {
    async getAllProducts({ limit = 10, page = 1, sort, query } = {}) {
        const filter = {};

        if (query) {
            if (query === 'true' || query === 'false') {
                filter.status = query === 'true';
            } else {
                filter.category = query;
            }
        }

        const options = {
            limit,
            page,
            lean: true
        };

        if (sort) {
            options.sort = { price: sort === 'asc' ? 1 : -1 };
        }

        return await Product.paginate(filter, options);
    }

    async getProductById(id) {
        const product = await Product.findById(id);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }

    async createProduct(productData) {
        const { title, description, price, code, stock, category } = productData;

        if (!title || !description || !price || !code || !stock === undefined || !category) {
            throw new Error('All fields are required: title, description, price, code, stock, category');
        }

        if (typeof price !== 'number' || price <= 0) {
            throw new Error('Price must be a positive number');
        }

        if (typeof stock !== 'number' || stock < 0) {
            throw new Error('Stock must be a non-negative number');
        }

        const existingProduct = await Product.findOne({ code });
        if (existingProduct) {
            throw new Error('Product with this code already exists');
        }

        return await Product.create(productData);
    }

    async updateProduct(id, updatedFields) {
        const product = await Product.findById(id);
        if (!product) {
            throw new Error('Product not found');
        }

        if (updatedFields.code) {
            const existingProduct = await Product.findOne({ code: updatedFields.code, _id: { $ne: id } });
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

        return await Product.findByIdAndUpdate(id, updatedFields, { new: true });
    }

    async deleteProduct(id) {
        const product = await Product.findById(id);
        if (!product) {
            throw new Error('Product not found');
        }
        return await Product.findByIdAndDelete(id);
    }
}

module.exports = new ProductService();
