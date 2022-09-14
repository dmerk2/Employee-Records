const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;

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
          "View Employees by Manager",
          "Update employee role",
          "Delete employee",
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
        case "Add an employee":
          addNewEmployee();
          break;
        case "Update employee role":
          updateRole();
        case "Delete Employee":
          deleteEmployee();
        case "View Employees by Manager":
          viewEmployeesByManager();
        case "Quit":
          quit();
        default:
          allDepartments();
      }
    });
};

// View all departments
const allDepartments = () => {
  console.log("Department View");
  let query = "SELECT * FROM department";
  db.query(query, (err, res) => {
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
  db.query(query, (err, res) => {
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
  db.query(query, (err, res) => {
    let employeeArray = [];
    res.forEach((employee) => employeeArray.push(employee));
    console.table(employeeArray);
    startQuestions();
  });
};

// Add a new department
const addNewDepartment = () => {
  console.log("Add a new department");
  inquirer
    .prompt([
      {
        name: "department_name",
        type: "input",
        message: "What department would you like to add?",
      },
    ])
    .then((res) => {
      // console.log(res);
      let sql = `INSERT INTO department (department_name) VALUES (?);`;
      db.query(sql, [res.department_name], (err, res) => {
        if (err) throw err;

        console.log("Successfully added a new department!");
        console.log(res);
        allDepartments();
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
      {
        name: "salary",
        type: "input",
        message: "What is the anual salary?",
      },
      {
        name: "departmentID",
        type: "input",
        message: "What department ID will the new employee the work in?",
      },
    ])

    .then((res) => {
      let sql = `INSERT INTO role (title, salary, department_id) 
      VALUES (?, ?, ?);`;

      db.query(
        sql,
        [res.newRole, Number(res.salary), Number(res.departmentID)],
        (err, res) => {
          console.log("Successfully added a new role!");
          if (err) throw err;
          allRoles();
        }
      );
    });
};

// Add a new employee
const addNewEmployee = () => {
  console.log("Add a new Employee");
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the employees first name?",
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the employees last name?",
      },
      {
        name: "role",
        type: "input",
        message: "What is the employees role ID",
      },
      {
        name: "manager",
        type: "input",
        message: "What is their managers ID?",
      },
    ])
    .then((res) => {
      let sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
      VALUES (?, ?, ?, ?);`;

      db.query(
        sql,
        [res.first_name, res.last_name, Number(res.role), Number(res.manager)],
        (err, res) => {
          if (err) throw err;
          allEmployees();
        }
      );
    });
};

const viewEmployeesByManager = () => {
  console.log("Which employee would you see their managers ID?");
  const query = "SELECT * FROM employee ORDER BY manager_id DESC";
  db.query(query, (err, res) => {
    if (err) throw err;
    inquirer.prompt([
      {
        name: "employee_manager",
        type: "list",
        message: "Which employee do you want to select?",
        choices: employeeArray
      },
    ]);
    console.table(res);
  });

  startQuestions();
};

// Update an employees role
const updateRole = () => {
  console.log("Update an employees role id?");

  let query = `SELECT * FROM employees
JOIN role ON employee.role_id = role.id;`
  // This is an Async Opertaion
  db.query(query, (res, err) => {
    if (err) throw err;
    let employeeArray = [];
    console.log(res);
    res.forEach((employee) => employeeArray.push(employee));
    console.table(employeeArray);
    console.log(employeeArray); // we need to know if we have the whole object or if we have the just the NAme
    // we might need to puill out the first_name and last_name
    inquirer
      .prompt([
        {
          name: "employee_name",
          type: "list",
          message: "Which employee would you like to update?",
          choices: employeeArray,
        },
        {
          name: "new_role",
          type: "list",
          choices: ["Manager", "Engineer", "Intern", "Quit"],
        },
      ])
      .then((response) => {
        console.log(response);
        let answer = response.new_role;

        switch (answer) {
          case "Manager":
            allDepartments();
            break;
          case "Engineer":
            allDepartments();
            break;
          case "Intern":
            allDepartments();
            break;
          case "Quit":
            allDepartments();
            break;
        }
      });
  });
};

// Delete Employee
const deleteEmployee = () => {
  inquirer
    .prompt([
      {
        name: "delete_employee",
        type: "list",
        message: "Which employee would you like to delete?",
        choices: [],
      },
    ])
    .then((res) => {
      let sql = "DELETE FROM employee WHERE ?";
      db.query(sql, [res.delete_employee], (err) => {
        if (err) throw err;
      });
    });
};

// Quit the application
const quit = () => {
  if ("Quit") {
    process.exit();
  }
};