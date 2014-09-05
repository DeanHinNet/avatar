var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	username: String,
	first_name: String,
	last_name: String,
	email: String,
	password: String,
	birthdate: Date,
	meta_data: {	
		last_login: Date
	},
	preferences: {
		notifications: Boolean
	}
});