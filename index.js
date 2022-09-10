const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connection to mysql
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",

    // Insert PLACEHOLDER password???
    password: "Ultraatomicwebdesigns123#",
    database: "employees_db",
  },
  console.log("Connected to the employees_db databse")
);

// Connect to the db and start application
db.connect((err) => {
  if (err) {
    throw err;
  }
  startQuestions();
});

// Begin the application
const startQuestions = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "title",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update employee role",
          "Quit",
        ],
      },
    ])
    .then((res) => {
      let answer = res.title;

      // Call individual functions for user interactions
      switch (answer) {
        case "View all departments":
          allDepartments();
          break;
        case "View all roles":
          allRoles();
          break;
        case "View all employees":
          allEmployees();
          break;
        case "Add a department":
          addNewDepartment();
          break;
        case "View all employees":
          allEmployees();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add new employee":
          addNewEmployee();
          break;
        case "Update employee role":
          updateRole();
        case "Quit":
          return;
        default:
          "You choose an option";
      }
    });
};

// View all departments
const allDepartments = () => {
  console.log("Department View");
  let query = "SELECT * FROM department";
  db.query(query, function (err, res) {
    let departmentArray = [];
    // Push all departments to deparments array
    res.forEach((department) => departmentArray.push(department));
    // View all departments in console.table
    console.table(departmentArray);
    startQuestions();
  });
};

// View all Roles
const allRoles = () => {
  console.log("All roles");
  let query = "SELECT * FROM role";
  db.query(query, function (err, res) {
    let allRolesArray = [];
    res.forEach((role) => allRolesArray.push(role));
    console.table(allRolesArray);
    startQuestions();
  });
};

// View all employees
const allEmployees = () => {
  console.log("All employees");
  let query = "SELECT * FROM employee";
  db.query(query, function (err, res) {
    let employeeArray = [];
    res.forEach((employee) => employeeArray.push(employee));
    console.table(employeeArray);
    startQuestions();
  });
};

// Add a new department
const addNewDepartment = () => {
  console.log("Add a new department");
  let answer = inquirer
    .prompt([
      {
        name: "newDepartment",
        type: "input",
        message: "What department would you like to add?",
      },
    ])
    .then((req, res) => {
      let result = res.input;
      console.log(answer);
      // Create a department
      app.post("/api/new-department", ({ body }, res) => {
        const sql = `INSERT INTO department (department_name)
    VALUES (?)`;
        const params = [body.department];

        console.log(answer);
        db.query(sql, params, (err, result) => {
          if (err) {
            throw err;
          }
          res.json({
            message: "success",
            data: body,
          });
        });
      });
    });
};

// Add a new role
const addRole = () => {
  console.log("Add a role");
  inquirer
    .prompt([
      {
        name: "newRole",
        type: "input",
        message: "What role would you like to add?",
      },
    ])
    .then((req, res) => {
      let answer = res.input;
    });
};

// Add a new employee
const addNewEmployee = () => {
  console.log("Add a new Employee");
  inquirer
    .prompt([
      {
        name: "newEmployee",
        type: "input",
        message: "What is the new employees name?",
      },
    ])
    .then((req, res) => {
      let answer = res.anwer;
    });
};

// Update an employees role
const updateRole = () => {
  console.log("Update an employees role");
};

// Starting server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
