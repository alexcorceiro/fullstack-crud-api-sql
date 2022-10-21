const Pool = require("pg").Pool;

const pool = new Pool({
     user: "postgres",
     host: "localhost",
     database: "tasksdb",
     password: "ROOT",
     port: 5432,
});
pool.connect(function(err) {
    if (err) throw err;
    console.log("db connected!!");
  });

module.exports = pool;