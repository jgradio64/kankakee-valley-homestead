let mongoose = require('mongoose');

let AdminSchema = new mongoose.Schema({
	email: String,
	password: String
});

module.exports = new mongoose.model('Admin', AdminSchema);
