const express = require('express');
const UserController = require('../controllers/userController');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.get('/token', UserController.getUserByToken);
router.post("/", UserController.createUser);
router.patch("/:id", UserController.updateUserById);
router.delete("/:id", UserController.deleteUserById);

module.exports = router;