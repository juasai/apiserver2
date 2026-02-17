const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/', cartController.getAllCarts.bind(cartController));
router.get('/:cid', cartController.getCartById.bind(cartController));
router.post('/', cartController.createCart.bind(cartController));
router.post('/:cid/product/:pid', cartController.addProductToCart.bind(cartController));
router.put('/:cid/product/:pid', cartController.updateProductQuantity.bind(cartController));
router.delete('/:cid/product/:pid', cartController.removeProductFromCart.bind(cartController));
router.delete('/:cid', cartController.deleteCart.bind(cartController));

module.exports = router;
