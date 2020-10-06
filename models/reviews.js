let mongoose = require('mongoose');

let ReviewSchema = new mongoose.Schema({
	user: String,
	rating: Number,
	review_description: String
});

module.exports = new mongoose.model('Review', ReviewSchema);
