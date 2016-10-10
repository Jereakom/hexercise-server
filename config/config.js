require('dotenv').config();

var config = {};
config.db = {};
config.web = {};

config.db.url = process.env.CONN_STRING;

config.web.port = process.env.PORT || 80;

module.exports = config;
