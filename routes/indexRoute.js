const express = require('express');
const customerRoute = require('./userRoute');
const authRoute = require('./authRoute');

const router = express.Router();

router.get('/status', (req, res) => res.send('Server is up'));
router.use('/auth', authRoute);
router.use('/users', customerRoute);
router.use((req, res) => {
    res.status(404).json({"message": "Page Not Found"});
});

module.exports = router;
