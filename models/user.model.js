const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 6,
		maxlength: 30
	},
	password: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
});

userSchema.methods.hashPassword = function (rawPassword) {
	const saltRounds = 10;
	this.password = bcrypt.hash(rawPassword, saltRounds);
};

userSchema.methods.comparePassword = function (plainTextPassword) {
	return bcrypt.compare(plainTextPassword, this.password);
};

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
