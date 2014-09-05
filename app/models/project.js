var mongoose = require('mongoose');

module.exports = mongoose.model('Project', {
	name:  String,
	skills: String,
	actions: String,
	goals: String,
	notes: String,
	progress: Number,
	labels: String,
	resources: String
});