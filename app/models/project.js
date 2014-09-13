var mongoose = require('mongoose');

module.exports = mongoose.model('Project', {
	name:  String,
	categories: String,
	progress: Number,
	status: String,
	notes: String,
	resources: String,
	skills: String,
	tasks: String,
	goals: String

});