const mysql = require('mysql2');
const { printTable } = require('console-table-printer')
const inquirer = require('./node_modules/inquirer')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "Sagittarius95!",
  database: 'employee_db'
});



// connection.query(
//   'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//   ['Page', 45],
//   function(err, results) {
//     console.log(results);
//   }
// );

function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "welcome to the companies content management system, please make a choice from the options below.",
        choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
        name: "options"
      },
    ]).then((answer) => {
      console.log(answer.options)
      switch (answer.options) {
        case "view all departments":
          connection.query(
            'SELECT * FROM `departments`', function (err, results) {
              console.log("\n")
              printTable(results); // results contains rows returned by server
              mainMenu();
            }
          );

          return

        case "view all roles":
          connection.query('SELECT * FROM roles', function (err, results) {
            console.log("\n")
            printTable(results);
            mainMenu();
          });
          return;

        case "view all employees":
          connection.query('SELECT * FROM employees', function (err, results) {
            console.log("\n")
            printTable(results);
            mainMenu();
          });
          return;

        case "add a department":
          addDepartment();
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
    });
}



mainMenu();