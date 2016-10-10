require('dotenv').config();

var config = {};
config.db = {};
config.web = {};

config.db.url = process.env.DATABASE_URL;

config.web.port = process.env.PORT || 80;

module.exports = config;
