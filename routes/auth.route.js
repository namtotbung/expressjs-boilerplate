const express = require('express');
const AuthController = require('../controllers/auth.controller');
const isAuth = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.patch('/change-password',isAuth , AuthController.changePassword);

module.exports = router;