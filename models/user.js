// user model
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstname: {type: String, required: true},
	lastname: {type: String, require: true},
	email: {type: String, uqique: true, required: true},
	password: {type: String, required: true}
});

module.exports = mongoose.model('User', UserSchema);

