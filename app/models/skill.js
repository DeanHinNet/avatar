var mongoose = require('mongoose');

module.exports = mongoose.model('Skill', {
	name:  String,
	category: String,
	sub: String,
	path: String,
	points: Number
});

// module.exports = mongoose.model('Skill', {
// 	user_id: ObjectID,
// 	name:  String,
// 	category: String,
// 	sub: String,
// 	path: String,
// 	points: Number
// });