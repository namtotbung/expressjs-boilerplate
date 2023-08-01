const UserController = require('../models/userModel');
const mongoose = require("mongoose");

const getAllUsers = async (req, res) => {
    try {
        const customers = await UserController.find();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch customers' });
    }
};

const getUserByToken = async (req, res) => {
    const customerId = req.customerId;
    if (!customerId) {
        return res.status(401).json({ error: 'Invalid token' });
    }
    try {
        const customer = await UserController.findById(customerId).populate('cart.productId').populate('wishList.productId');
        if (!customer) {
            return res.status(404).json({ error: 'UserController not found' });
        }
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch customer' });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
      const customer = await UserController.findById(id).populate('cart.productId').populate('wishList.productId');
      if (!customer) {
        return res.status(404).json({ error: 'UserController not found' });
      }
      res.json(customer);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch customer' });
    }
  };

const createUser = async (req, res) => {
    const {
        username,
        password,
        firstName,
        lastName,
    } = req.body;
    try {
        const user = new UserController({
            username,
            firstName,
            lastName,
        });
        user.setPassword(password);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({"message": error.message});
        } else {
            res.sendStatus(500);
        }
    }
};

const updateUserById = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const customer = await UserController.findByIdAndUpdate(id, updateData, { new: true });
        if (!customer) {
            return res.status(404).json({ error: 'UserController not found' });
        }
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update customer' });
    }
};

const deleteUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const customer = await UserController.findByIdAndDelete(id);
        if (!customer) {
            return res.status(404).json({ error: 'UserController not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete customer' });
    }
};

module.exports = {
    getAllUsers,
    getUserByToken,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById
};
