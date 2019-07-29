const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
	message: { type: String, required: true },
	attention: { type: Boolean, required: true },
	tech: { type: String, required: true },
	date: { type: Date, default: new Date() }
});

module.exports = mongoose.model('Log', LogSchema);
