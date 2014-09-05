var mongoose = require('mongoose');

module.exports = mongoose.model('Task', {
	name: String,
	projects: String,
	goals: String,
	skills: String,
	status: String,
	due: String,
	created: String
});