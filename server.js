const inquirer = require("inquirer");
const fs = require("fs");

const questions = () => {
  return inquirer.prompt([
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
      ],
    },
  ]);
};

questions();