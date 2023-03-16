const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('./node_modules/inquirer')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "Sagittarius95!",
  database: 'employee_db'
});

// connection.query(
//   'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
//   function(err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//   }
// );

// connection.query(
//   'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//   ['Page', 45],
//   function(err, results) {
//     console.log(results);
//   }
// );

function mainMenu(){
inquirer
  .prompt([
    {
      type: "list",
      message: "welcome to the companies content management system, please make a choice from the options below.",
      choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "quit"],
      name: "options"
    },
  ]).then((answer) => {
    switch (answer) {
      case "view all departments":
        viewDepartment();
        return;

      case "view all roles":
        viewRoles();
        return;

      case "view all employees":
        viewEmployees();
        return;

      case "add a department":
        addDeptartment();
        return;

      case "add a role":
        addRole();
        return;

      case "add an employee":
        addEmployee();
        return;

      case "update an employee role":
        updateRole();
        return;

    }
  });}
    
  function viewDepartment(){

    mainMenu()
  }
  function viewRoles(){

    mainMenu()
  }
  function viewEmployees(){

    mainMenu()
  }
  function addDeptartment(){

    mainMenu()
  }
  function addRole(){

    mainMenu()
  }
  function addEmployee(){

    mainMenu()
  }
  function updateRole(){

    mainMenu()
  }

  mainMenu();