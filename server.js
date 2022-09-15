const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;

// Connection to mysql
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",

    // PLACEHOLDER PASSWORD BEFORE SUBMISSION
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
          "Quit",
        ],
      },
    ])
    .then((res) => {
      let answer = res.title;
      // console.log(res);

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
          break;
        case "View Employees by Manager":
          viewEmployeesByManager();
          break;
        case "Quit":
          quit();
          break;
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
    res.forEach((department) => departmentArray.push(department));
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
      let sql = `INSERT INTO department (department_name) VALUES (?);`;
      db.query(sql, [res.department_name], (err, res) => {
        if (err) throw err;
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

// View all employees
const viewEmployeesByManager = () => {
  let query = "SELECT * FROM employee ORDER BY manager_id DESC;";
  db.query(query, (err, res) => {
    let employeeArray = [];
    res.forEach((employee) => employeeArray.push(employee));
    console.table(employeeArray);
    startQuestions();
  });
};

// Selection to update a roll for a specific employee.
const updateRole = async () => {
    try {
        console.log('Employee Update');
        
        let employees = await db.query("SELECT * FROM employee");

        let employeeSelection = await inquirer.prompt([
            {
                name: 'employee',
                type: 'list',
                choices: employees.map((employeeName) => {
                    return {
                        name: employeeName.first_name + " " + employeeName.last_name,
                        value: employeeName.id
                    }
                }),
                message: 'Please choose an employee to update.'
            }
        ]);

        let roles = await db.query("SELECT * FROM role");

        let roleSelection = await inquirer.prompt([
            {
                name: 'role',
                type: 'list',
                choices: roles.map((roleName) => {
                    return {
                        name: roleName.title,
                        value: roleName.id
                    }
                }),
                message: 'Please select the role to update the employee with.'
            }
        ]);

        let result = await db.query("UPDATE employee SET ? WHERE ?", [{ role_id: roleSelection.role }, { id: employeeSelection.employee }]);

        console.log(`The role was successfully updated.\n`);
        startQuestions();

    } catch (err) {
        console.log(err);
        startQuestions();
    };
}

// View all employees
// const updateRole = async () => {
//   console.log("All Roles");
//   let query = `SELECT * FROM employee ORDER BY manager_id DESC;`;
//   console.log("Update an employees role id?");
//   db.query(query, (err, res) => {
//     if (err) throw err;
//     let roleArray = [];
//     res.forEach((role) => roleArray.push(role));
//     console.table(roleArray);
//     inquirer
//       .prompt([
//         {
//           name: "employee_manager",
//           type: "list",
//           message: "Which employee do you want to select?",
//           choices: roleArray,
//         },
//         {
//           name: "new_role",
//           type: "list",
//           message: "What role will they be assigned to?",
//           choices: ["Manager", "Engineer", "Intern", "Quit"],
//         },
//       ])
//       .then((res) => {
//         console.table(roleArray);

//         // console.log(res);
//         let answer = res.new_role;

//         switch (answer) {
//           case "Manager":
//             allDepartments();
//             break;
//           case "Engineer":
//             allDepartments();
//             break;
//           case "Intern":
//             allDepartments();
//             break;
//           case "Quit":
//             allDepartments();
//             break;
//           default:
//             allDepartments();
//         }
//       });
//   });
//   await allRoles();
// };

// Delete an Employee
const deleteEmployee = () => {
  let sql = `SELECT employee.id, employee.first_name, employee.last_name FROM employee`;

  db.query(sql, (err, res) => {
    if (err) throw err;
    let employeeNamesArray = [];
    res.forEach((employee) => {
      employeeNamesArray.push(employee);
    });

    inquirer
      .prompt([
        {
          name: "chosenEmployee",
          type: "list",
          message: "Which employee would you like to remove?",
          choices: employeeNamesArray,
        },
      ])
      .then((res) => {
        let employeeId;

        res.forEach((employee) => {
          if (
            res.chosenEmployee ===
            `${employee.first_name} ${employee.last_name}`
          ) {
            employeeId = employee.id;
          }
        });

        let sql = `DELETE FROM employee WHERE employee.id = (?);`;
        db.query(sql, [res.employeeId], (err) => {
          if (err) throw err;
          console.log(`Employee Successfully Removed`);
          allEmployees();
        });
      });
  });
};

// Quit the application
const quit = () => {
  if ("Quit") {
    process.exit();
  }
};
