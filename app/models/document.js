var mongoose = require('mongoose');

module.exports = mongoose.model('Document', {
	block_id: mongoose.Schema.Types.ObjectId,
	block: String,
	text: String,
});




