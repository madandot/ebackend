const { Router } = require('express');
const { addProduct, getProducts } = require('../controllers/productControllers');
const router = Router();
router.get('/', getProducts);
router.post('/', addProduct);

module.exports = router;
