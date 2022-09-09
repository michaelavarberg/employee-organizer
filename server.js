const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    user: "root",
    password: "mymrs.v4rbs!",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);

db.query("SELECT * FROM employees", function (err, results) {
  console.log(results);
});
