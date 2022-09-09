const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

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
    password: "Ultraatomicwebdesigns123#",
    database: "employees_db",
  },
  console.log("Connected to the employees_db databse")
);

db.connect((err) => {
  if (err) {
    throw err;
  }
  startQuestions()
});

const startQuestions = () => {
  let answer = inquirer.prompt([
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
  ]);

  // Call individual functions for user interactions
  switch (answer.action) {
    case "View all departments":
      allDepartments();
      break;
    case "View all roles":
      allRoles();
      break;
    case "View all employees":
      addNewDepartment();
      break;
    case "Add a department":
      allRoles();
      break;
    case "Add a role":
      allEmployees();
      break;
    case "Add an employee":
      addRole();
      break;
    case "Update employee role":
      updateRole();
    case "Quit":
      return;
    default:
      "You must choose an option";
  }
};

const allDepartments = () => {
  console.log("All Departments");
};

const allRoles = () => {
  console.log("All roles");
};

const allEmployees = () => {
  console.log("All employees");
};

const addNewDepartment = () => {
  console.log("Add a new department");
};

const addRole = () => {
  console.log("Add a role");
};

const updateRole = () => {
  console.log("Update an employees role");
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// // Create a new employee
// app.post("/api/new_employee", ({ body }, res) => {
//   const sql = "INSERT INTO employee (new_employee) VALUES (?)";
//   const params = [body.employees_db];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       console.log("Error adding new employee: ", err);
//       return;
//     }
//     res.json({
//       message: "Added new employee!",
//       data: body,
//     });
//   });
// });

// // Read all employees
// app.get("/api/employees_db", (req, res) => {
//   const sql = "SELECT id, first_name AS name FROM employees";
//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "All employees",
//       data: rows,
//     });
//   });
// });
