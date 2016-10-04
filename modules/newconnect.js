require('dotenv').config();

var pgp = require("pg-promise")(/*options*/);

// var conn = {
//
//     // host: process.env.DB_HOST,
//     // port: process.env.DB_PORT,
//     // database: process.env.DB,
//     // user: process.env.DB_USER,
//     // password: process.env.DB_PWD,
//     ssl: 'true'
//   };

var db = pgp('postgres://kiivbqkqjrmudf:4RMK_1Xk2rekkD23S4r91PhciW@ec2-54-75-228-83.eu-west-1.compute.amazonaws.com:5432/del8prb26rjs6r?ssl=true');

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
