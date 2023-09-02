require('dotenv').config();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
	return jwt.sign({userId: user._id}, process.env.TOKEN_SECRET);
};
const register = async (req, res) => {
	const {
		username,
		password,
		firstName,
		lastName,
	} = req.body;
	try {
		const user = new User({
			username,
			firstName,
			lastName,
		});
		user.setPassword(password);
		await user.save();
		res.status(201).json(user);
	} catch (error) {
		if (error.name === 'ValidationError') {
			return res.status(400).json({'message': error.message});
		} else {
			res.sendStatus(500);
		}
	}
};

const login = async (req, res) => {
	const {username, password} = req.body;
	try {
		const user = await User.findOne({username});
		if (!user) {
			return res.sendStatus(404);
		} else if (!user.validatePassword(password)) {
			return res.sendStatus(401);
		}
		const token = generateToken(user);
		res.json({token});
	} catch (error) {
		res.sendStatus(500);
	}
};

const changePassword = async (req, res) => {
	const token = req.token;
	const {currentPassword, newPassword} = req.body;
	try {
		const user = await User.findById(token.userId);

		if (!user) {
			return res.sendStatus(404);
		}

		if (!user.validatePassword(currentPassword)) {
			return res.sendStatus(401);
		}

		user.setPassword(newPassword);
		await user.save();
		res.sendStatus(200);
	} catch (error) {
		res.sendStatus(500);
	}
};

module.exports = {
	register,
	login,
	changePassword
};
