var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	username: String,
	first_name: String,
	last_name: String,
	email: String,
	password: String
});

/*
	preferences: {
		display: {
			tasks: {
				name: Boolean;
				projects: Boolean;
				goals: Boolean;
				status: Boolean;
				due: Boolean;
				created: Boolean;
				docs: Boolean;
			},
			projects: {}
		}
	};
*/