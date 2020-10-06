let mongoose = require('mongoose');

let ProductSchema = new mongoose.Schema({
	product_name: String,
	quantity: Number,
	price: Number,
	description: String,
	image: {
		data: Buffer,
		contentType: String
	}
});

module.exports = new mongoose.model('Product', ProductSchema);
