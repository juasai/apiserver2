const productService = require('../services/productService');

class ProductController {
    getIo(req) {
        return req.app.get('io');
    }

    async getAllProducts(req, res, next) {
        try {
            const { limit, page, sort, query } = req.query;

            const options = {
                limit: limit ? parseInt(limit, 10) : 10,
                page: page ? parseInt(page, 10) : 1,
                sort: sort || null,
                query: query || null
            };

            const result = await productService.getAllProducts(options);

            const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;
            const buildLink = (p) => {
                if (!p) return null;
                const params = new URLSearchParams();
                params.set('page', p);
                if (limit) params.set('limit', limit);
                if (sort) params.set('sort', sort);
                if (query) params.set('query', query);
                return `${baseUrl}?${params.toString()}`;
            };

            res.json({
                status: 'success',
                payload: result.docs,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.hasPrevPage ? buildLink(result.prevPage) : null,
                nextLink: result.hasNextPage ? buildLink(result.nextPage) : null
            });
        } catch (error) {
            next(error);
        }
    }

    async getProductById(req, res, next) {
        try {
            const product = await productService.getProductById(req.params.pid);
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
            const newProduct = await productService.createProduct(req.body);

            const io = this.getIo(req);
            if (io) {
                const result = await productService.getAllProducts();
                io.emit('updateProducts', result.docs);
            }

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
            const updatedProduct = await productService.updateProduct(req.params.pid, req.body);
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
            const deletedProduct = await productService.deleteProduct(req.params.pid);

            const io = this.getIo(req);
            if (io) {
                const result = await productService.getAllProducts();
                io.emit('updateProducts', result.docs);
            }

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
