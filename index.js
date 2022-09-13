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
    //When user chooses option, kick off function for that option
    .then((response) => {
      if (response.menu === "View All Employees") {
        db.query("SELECT * FROM employee", function (err, results) {
          console.table(results);
          menu();
        });
      } else if (response.menu === "Add Employee") {
        addEmployee();
      } else if (response.menu === "Update Employee Role") {
        updateRole();
      } else if (response.menu === "View All Roles") {
        db.query(
          "SELECT id, title, salary FROM roles",
          function (err, results) {
            console.table(results);
            menu();
          }
        );
      } else if (response.menu === "Add Role") {
        addRole();
      } else if (response.menu === "View All Departments") {
        db.query("SELECT * FROM department", function (err, results) {
          console.table(results);
          menu();
        });
      } else if (response.menu === "Add Department") {
        addDepartment();
      } else {
        process.exit();
      }
    });
}

async function addEmployee() {
  try {
    let [roles] = await db
      .promise()
      .query("SELECT id, title, salary FROM roles");
    let filteredRoles = roles.map(function (role) {
      return {
        name: role.title,
        value: role.id,
      };
    });
    let [managers] = await db.promise().query("SELECT * FROM employee");
    let filteredManagers = managers.map(function (manager) {
      return {
        name: manager.first_name + " " + manager.last_name,
        value: manager.id,
      };
    });

    let answers = await inquirer.prompt([
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
        choices: filteredRoles,
      },
      {
        type: "list",
        message: "Who is the employee's manager?",
        name: "manager",
        choices: filteredManagers,
      },
    ]);
    await db
      .promise()
      .query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
        [answers.first, answers.last, answers.role, answers.manager]
      );
    console.log("Added employee to database");
    menu();
  } catch (error) {
    console.log(error);
  }
}

async function addRole() {
  try {
    let [departments] = await db.promise().query("SELECT * FROM department");
    let filteredDepartments = departments.map(function (dept) {
      return {
        name: dept.name,
        value: dept.id,
      };
    });

    let answers = await inquirer.prompt([
      {
        type: "input",
        message: "What is the title of the role?",
        name: "title",
      },
      {
        type: "input",
        message: "What is the salary of this role?",
        name: "salary",
      },
      {
        type: "list",
        message: "Which department does this role fall under?",
        name: "department",
        choices: filteredDepartments,
      },
    ]);
    await db
      .promise()
      .query(
        `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`,
        [answers.title, answers.salary, answers.department]
      );
    console.log("Added new role to database");
    menu();
  } catch (error) {
    console.log(error);
  }
}

async function addDepartment() {
  try {
    let [departments] = await db.promise().query("SELECT * FROM department");
    let filteredDepartments = departments.map(function (dept) {
      return {
        name: dept.name,
        value: dept.id,
      };
    });

    let answers = await inquirer.prompt([
      {
        type: "input",
        message: "What is the title of the department?",
        name: "title",
      },
    ]);
    await db
      .promise()
      .query(`INSERT INTO department (name) VALUE (?)`, [answers.title]);
    console.log("Added new department to database");
    menu();
  } catch (error) {
    console.log(error);
  }
}

async function updateRole() {
  try {
    let [employees] = await db.promise().query("SELECT * FROM employee");
    let filteredEmployees = employees.map(function (employee) {
      return {
        name: employee.first_name + " " + employee.last_name,
        value: employee.id,
      };
    });

    let [roles] = await db.promise().query("SELECT * FROM roles");
    let filteredRoles = roles.map(function (role) {
      return {
        name: role.title,
        value: role.id,
      };
    });

    let answers = await inquirer.prompt([
      {
        type: "list",
        message: "Which employee would you like to update?",
        name: "employee",
        choices: filteredEmployees,
      },
      {
        type: "list",
        message: "What is this employee's new role?",
        name: "role",
        choices: filteredRoles,
      },
    ]);

    await db
      .promise()
      .query("UPDATE employee SET role_id = ? WHERE id = ?", [
        answers.role,
        answers.employee,
      ]);
    console.log("Updated employee in database.");
    menu();
  } catch (error) {
    console.log(error);
  }
}

menu();
