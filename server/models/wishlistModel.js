const { Schema, model } = require('mongoose');

const wishlistSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
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

const Wishlist = model('Wishlist', wishlistSchema);

module.exports = Wishlist;
