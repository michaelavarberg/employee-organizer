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

const rolesArray = [
  "Junior Analyst",
  "Senior Analyst",
  "Head of Analytics",
  "Junior Sales Rep",
  "Senior Sales Rep",
  "Head of Sales",
  "Junior Technical Engineer",
  "Senior Technical Engineer",
  "Head of Technology",
];

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
      console.log(response);
      if (response.menu === "View All Employees") {
        db.query("SELECT * FROM employee", function (err, results) {
          console.table(results);
          menu();
        });
      } else if (response.menu === "Add Employee") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is the employee's first name?",
              name: "first",
            },
            {
              type: "input",
              message: "What is the employee's last name?",
              name: "last",
            },
            {
              type: "list",
              message: "What is the employee's role?",
              name: "role",
              choices: [
                "Junior Analyst",
                "Senior Analyst",
                "Head of Analytics",
                "Junior Sales Rep",
                "Senior Sales Rep",
                "Head of Sales",
                "Junior Technical Engineer",
                "Senior Technical Engineer",
                "Head of Technology",
              ],
            },
            {
              type: "list",
              message: "Who is the employee's manager?",
              name: "manager",
              choices: ["None", "Mary Smith", "Alex Brown", "Ron Clark"],
            },
          ])
          .then((data) => {
            console.log(data);
            db.query(
              `SELECT id FROM roles WHERE title = (?)`,
              [data.role],
              function (err, results) {
                const roleId = results[0].id;
                const managerName = data.manager.split(" ");
                managerName.splice(1, 1);

                db.query(
                  `SELECT id FROM employee WHERE first_name = (?)`,
                  [managerName.toString()],
                  function (err, results, roleId) {
                    if (err) {
                      console.log(err);
                    } else {
                      db.query(
                        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
                        [data.first, data.last, roleId, results[0].id],
                        function (err, results) {
                          console.log(data.first);
                          console.log(data.last);
                          console.log(roleId);
                          console.log(results);

                          console.log(
                            "New employee has been added to the database."
                          );
                          menu();
                        }
                      );
                    }
                  }
                );
              }
            );

            // console.log(managerName);
            // db.query(
            //   `SELECT id FROM employee WHERE first_name = (?)`,
            //   [managerName.toString()],
            //   function (err, results) {
            //     if (err) {
            //       console.log(err);
            //     } else {
            //       console.log(results);
            //       db.query(
            //         `INSERT INTO employee (manager_id) VALUE (?)`,
            //         [results[0].id],
            //         function (err, results) {
            //           console.log(
            //             "Your new employee has been added to the database."
            //           );
            //           menu();
          });
      }
      // }
      //         );
      //       });
      //   }
      //     db.query("", function (err, results) {
      //       console.table(results);
      //       menu();
      //     });
      //   } else if (response.menu === "") {
      //     db.query("", function (err, results) {
      //       console.table(results);
      //       menu();
      //     });
      //   } else if (response.menu === "View All Roles") {
      //     db.query(
      //       "SELECT id, title, salary FROM roles",
      //       function (err, results) {
      //         console.table(results);
      //         menu();
      //       }
      //     );
      //   } else if (response.menu === "") {
      //     db.query("", function (err, results) {
      //       console.table(results);
      //       menu();
      //     });
      //   } else if (response.menu === "View All Departments") {
      //     db.query("SELECT * FROM department", function (err, results) {
      //       console.table(results);
      //       menu();
      //     });
      //   } else if (response.menu === "") {
      //     db.query("", function (err, results) {
      //       console.table(results);
      //       menu();
      //     });
    });
}

menu();
