require('dotenv').config();
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
	return jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
};
const register = async (req, res) => {
	const {
		username,
		password,
		firstName,
		lastName,
	} = req.body;
	try {
		const existingUser = await UserModel.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ message: 'Username is already in use' });
		}
		const newUser = new UserModel({
			username,
			firstName,
			lastName,
		});
		newUser.hashPassword(password);
		await newUser.save();
		return res.status(201).json(newUser);
	} catch (error) {
		if (error.name === 'ValidationError') {
			return res.status(400).json({ message: error.message });
		} else {
			return res.status(500).json({ message: error.message });
		}
	}
};

const login = async (req, res) => {
	const {username, password} = req.body;
	try {
		if (!(username && password)) {
			return res.status(400).json({ message: 'Missing username or password' });
		}
		const user = await UserModel.findOne({ username });
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		} else if (!user.comparePassword(password)) {
			return res.status(401).json({ message: 'Incorrect username or password' });
		}
		const token = generateToken(user);
		return res.status(200).json({ token });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const changePassword = async (req, res) => {
	const token = req.token;
	const {currentPassword, newPassword} = req.body;
	try {
		const user = await UserModel.findById(token._id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		if (!user.comparePassword(currentPassword)) {
			return res.status(401).json({ message: 'Incorrect password' });
		}
		user.hashPassword(newPassword);
		await user.save();
		return res.status(200).json({ message: 'Change password successfully' });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
	register,
	login,
	changePassword
};
