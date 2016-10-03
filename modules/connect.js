require('dotenv').config();
var pg = require('pg');

pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) {
    done();
    console.log(err);
    return ;
  }
  console.log('Connected to postgres! Doing magic...');
    client.query('SELECT * FROM users;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});
