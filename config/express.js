const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const routes = require('../routes/indexRoute');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true, limit: '100kb'}));
app.use(bodyParser.json({extended: true, limit: '5mb'}));

app.use('/', routes);

module.exports = app;