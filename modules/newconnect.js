require('dotenv').config();

var pgp = require("pg-promise")(/*options*/);

var conn = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    ssl: 'true'
  };

var db = pgp(conn);

db.any('select * from posts;')
.then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all posts'
        });
    })
    .catch(function (err) {
      return next(err);
    });
