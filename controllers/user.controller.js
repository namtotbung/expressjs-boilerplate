const UserModel = require('../models/user.model');

const getAllUsers = async (req, res) => {
	try {
		const users = await UserModel.find();
		return res.status(200).json(users);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getUserById = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await UserModel.findById(id);
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
const updateUserById = async (req, res) => {
	const { id } = req.params;
	const updateData = req.body;
	try {
		const user = await UserModel.findByIdAndUpdate(id, updateData, { new: true });
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const deleteUserById = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await UserModel.findByIdAndDelete(id);
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getAllUsers,
	getUserById,
	updateUserById,
	deleteUserById
};
