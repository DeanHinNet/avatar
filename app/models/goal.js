var mongoose = require('mongoose');

module.exports = mongoose.model('Goal', {
	name:  String,
	skills: String,
	projects: String,
	actions: String,
	goals: String,
	social: String,
	notes: String,
	progress: Number,
	labels: String,
	resources: String
});

// module.exports = mongoose.model('Goal', {
// 	user_id: ObjectID,
// 	name:  String,
// 	description: String,
// 	progress: Number,
// 	note: String,
// 	privacy: String, //Share with all, share with a few, share anonymously

// 	social: String,
// 	//Type of Array to hold the ids of each.
// 	resources: Array,
// 	categories: Array,
// 	skills: Array,
// 	projects: Array,
// 	actions: Array,
// 	goals: Array,
// });