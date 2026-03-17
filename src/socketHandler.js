const productService = require('../services/productService');

function setupSocketHandlers(io) {
    io.on('connection', (socket) => {
        console.log('Cliente conectado:', socket.id);

        socket.on('addProduct', (productData) => {
            try {
                const newProduct = productService.createProduct(productData);
                const products = productService.getAllProducts();
                io.emit('updateProducts', products);
                socket.emit('productAdded', newProduct);
            } catch (error) {
                socket.emit('error', { message: error.message });
            }
        });

        socket.on('deleteProduct', (productId) => {
            try {
                const id = parseInt(productId, 10);
                if (isNaN(id)) {
                    socket.emit('error', { message: 'Invalid product ID' });
                    return;
                }
                
                const deletedProduct = productService.deleteProduct(id);
                const products = productService.getAllProducts();
                io.emit('updateProducts', products);
            } catch (error) {
                socket.emit('error', { message: error.message });
            }
        });

        socket.on('disconnect', () => {
            console.log('Cliente desconectado:', socket.id);
        });
    });
}

module.exports = setupSocketHandlers;
