var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	username: String,
	first_name: String,
	last_name: String,
	email: String,
	password: String
});