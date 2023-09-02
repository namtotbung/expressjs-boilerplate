const express = require('express');
const UserController = require('../controllers/user.controller');
const isAuth = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.get('/token', UserController.getUserByToken);
router.post("/", UserController.createUser);
router.patch("/:id", UserController.updateUserById);
router.delete("/:id", UserController.deleteUserById);

module.exports = router;