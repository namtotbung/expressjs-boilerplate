const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const routes = require('../routes/indexRoute');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', routes);

module.exports = app;