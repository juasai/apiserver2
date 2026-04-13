const productService = require('./services/productService');

function setupSocketHandlers(io) {
    io.on('connection', async (socket) => {
        console.log('Cliente conectado:', socket.id);

        try {
            const result = await productService.getAllProducts();
            socket.emit('updateProducts', result.docs);
        } catch (error) {
            socket.emit('error', { message: error.message });
        }

        socket.on('addProduct', async (productData) => {
            try {
                const newProduct = await productService.createProduct(productData);
                const result = await productService.getAllProducts();
                io.emit('updateProducts', result.docs);
                socket.emit('productAdded', newProduct);
            } catch (error) {
                socket.emit('error', { message: error.message });
            }
        });

        socket.on('deleteProduct', async (productId) => {
            try {
                await productService.deleteProduct(productId);
                const result = await productService.getAllProducts();
                io.emit('updateProducts', result.docs);
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
