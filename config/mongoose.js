const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connection.on('connecting', () => {
    console.log('Mongo connecting');
});

mongoose.connection.on('connected', () => {
    console.log('Mongo connected');
});

mongoose.connection.on('disconnecting', (err) => {
    console.log('Mongo disconnecting');
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongo disconnected');
});

mongoose.connection.on('error', (err) => {
    console.log(`Mongo error: ${err}`);
    process.exitCode = 1;
});

const mongouri = process.env.MONGO_URI;

exports.start = () => {
    mongoose.connect(mongouri, {useNewUrlParser: true}).catch((err) => console.log(err));
    return mongoose.connection;
};
