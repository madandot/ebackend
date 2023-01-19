const asyncHandler = require('express-async-handler');

const Product = require('../models/productModel.js');

const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find();
	res.status(200).json({
		statusCode: 200,
		products,
	});
});

const addProduct = asyncHandler(async (req, res) => {
	const productBody = req.body;
	if (
		!productBody.image ||
		!productBody.name ||
		!productBody.brand ||
		!productBody.ratings ||
		!productBody.reviews ||
		!productBody.rating ||
		!productBody.spec ||
		!productBody.price
	) {
		return res.status(400).json({
			statusCode: 400,
			message: 'Please provide all required fields',
		});
	}

	const productValidation = await Product.findOne({ name: productBody.name, brand: productBody.brand });
	if (productValidation) {
		return res.status(400).json({
			statusCode: 400,
			message: 'Product already exists',
		});
	}
	const product = await Product.create(productBody);
	res.status(201).json({
		statusCode: 201,
		data: product,
	});
});

module.exports = {
	getProducts,
	addProduct,
};
