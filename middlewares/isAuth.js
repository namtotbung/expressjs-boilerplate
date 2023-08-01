const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
	const authHeader = req.get('Authorization');
	if (!authHeader) {
		res.sendStatus(401);
	}
	const token = authHeader.split(' ')[1];
	let decodedToken = null;
	try {
		decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
		if (!decodedToken) {
			res.sendStatus(401);
		}
	} catch (error) {
		res.sendStatus(500);
	}
	req.token = decodedToken;
	next();
};
