const { Schema, model } = require('mongoose');

const productSchema = new Schema(
	{
		image: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		ratings: {
			type: String,
			required: true,
		},
		reviews: {
			type: String,
			required: true,
		},
		rating: {
			type: String,
			required: true,
		},
		spec: {
			type: Array,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
				delete ret.createdAt;
				delete ret.updatedAt;
			},
		},
		timestamps: true,
	}
);
productSchema.statics.isProductExist = async (productId) => {
	const product = await Product.findById(productId).lean();
	if (product) {
		return true;
	}
	return false;
};

const Product = model('Product', productSchema);

module.exports = Product;
