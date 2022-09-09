const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "mymrs.v4rbs!",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);

function menu() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "menu",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
      },
    ])
    .then((response) => {
      if (response.menu === "View All Employees") {
        db.query("SELECT * FROM employee", function (err, results) {
          console.table(results);
          menu();
        });
      } else if (response.menu === "") {
        db.query("", function (err, results) {
          console.table(results);
          menu();
        });
      } else if (response.menu === "") {
        db.query("", function (err, results) {
          console.table(results);
          menu();
        });
      } else if (response.menu === "View All Roles") {
        db.query("SELECT * FROM roles", function (err, results) {
          console.table(results);
          menu();
        });
      } else if (response.menu === "") {
        db.query("", function (err, results) {
          console.table(results);
          menu();
        });
      } else if (response.menu === "View All Departments") {
        db.query("SELECT * FROM department", function (err, results) {
          console.table(results);
          menu();
        });
      } else if (response.menu === "") {
        db.query("", function (err, results) {
          console.table(results);
          menu();
        });
      }
    });
}

menu();
