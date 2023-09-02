const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 6,
		maxlength: 30,
	},
	password: {
		salt: {
			type: String,
			required: true
		},
		hash: {
			type: String,
			required: true
		}
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
	}
});

userSchema.methods.setPassword = function (password) {
	this.password.salt = crypto.randomBytes(16).toString('hex');
	this.password.hash = crypto.pbkdf2Sync(password, this.password.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validatePassword = function (password) {
	const hash = crypto.pbkdf2Sync(password, this.password.salt, 1000, 64, 'sha512').toString('hex');
	return this.password.hash === hash;
};

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
