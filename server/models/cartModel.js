const { Schema, model } = require('mongoose');

const cartSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User' },
		product: { type: Schema.Types.ObjectId, ref: 'Product' },
		quantity: { type: Number, required: true },
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

cartSchema.statics.isCartItemExist = async (userId, productId) => {
	const cartItem = await Cart.findOne({
		user: userId,
		product: productId,
	});

	if (cartItem) {
		return cartItem;
	}

	return false;
};

cartSchema.methods.updatedQuantity = async function () {
	this.quantity = this.quantity + 1;
	await this.save();
};

const Cart = model('Cart', cartSchema);

module.exports = Cart;
