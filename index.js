const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require('mysql2');
const consoleTable = require("console.table");


inquirer.registerPrompt("table", require("./index"));
  inquirer.prompt([
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
        "Quit"
      ],
    },
  ]);

// questions();