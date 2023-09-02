require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connection.on('connecting', () => {
	console.log('Mongo connecting');
});

mongoose.connection.on('connected', () => {
	console.log('Mongo connected');
});

mongoose.connection.on('disconnecting', () => {
	console.log('Mongo disconnecting');
});

mongoose.connection.on('disconnected', () => {
	console.log('Mongo disconnected');
});

mongoose.connection.on('error', (error) => {
	console.log(`Mongo error: ${error}`);
	process.exitCode = 1;
});

const mongouri = process.env.MONGO_URI;

exports.start = () => {
	mongoose.connect(mongouri, {useNewUrlParser: true}).catch((error) => console.log(error));
	return mongoose.connection;
};
