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

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "please give the new department a name",
        name: "name"
      },
    ]).then((answer) => {
      console.log(answer.name)
      connection.query('INSERT INTO departments SET ?',
      {
        department_name: `${answer.name}`
      })
      mainMenu()
    })
}

function addRole() {
  connection.query('SELECT * FROM departments', function (err, departments) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          message: "please give the new role a title",
          name: "title"
        },{
          type: "number",
          message: "please enter the salary for the new role",
          name: "salary"
        },{
          type: "list",
          message: "which department would you like to assign the role to?",
          choices: departments.map(department => ({ name: department.department_name, value: department.id })),
          name: "department_id"
        },
      ]).then(answers => {
        connection.query(
          'INSERT INTO roles SET ?',
          {
            title: answers.title,
            salary: answers.salary,
            department_id: answers.department_id,
          },
          function (err, res) {
            if (err) throw err;
            console.log(`\nNew role ${answers.title} added to the database!\n`);
            mainMenu();
          }
        );
      });
  });
};

function addEmployee() {
  connection.query('SELECT * FROM roles', function (err, roles) {
    if (err) throw err;
    connection.query('SELECT * FROM employees', function (err, employees) {
      if (err) throw err;
      inquirer
        .prompt([
          {
            type: "input",
            message: "Please enter the first name of the new employee:",
            name: "firstName"
          },
          {
            type: "input",
            message: "Please enter the last name of the new employee:",
            name: "lastName"
          },
          {
            type: "list",
            message: "Please select the role for the new employee:",
            choices: roles.map(role => ({ name: role.title, value: role.id })),
            name: "roleId"
          },
          {
            type: "list",
            message: "Please select the manager for the new employee:",
            choices: employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id })),
            name: "managerId"
          }
        ])
        .then(answers => {
          connection.query(
            'INSERT INTO employees SET ?',
            {
              first_name: answers.firstName,
              last_name: answers.lastName,
              role_id: answers.roleId,
              manager_id: answers.managerId
            },
            function (err, res) {
              if (err) throw err;
              console.log(`\nNew employee ${answers.firstName} ${answers.lastName} added to the database!\n`);
              mainMenu();
            }
          );
        });
    });
  });
}

function updateRole() {
  connection.query('SELECT * FROM employees', function (err, employees) {
    if (err) throw err;
  connection.query('SELECT * FROM roles', function (err, roles) {
    if (err) throw err;
    
      inquirer
        .prompt([
          {
            type: "list",
            message: "Please select the emplyoee you'd like to update:",
            choices: employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.first_name })),
            name: "employeeId"
          },
          {
            type: "list",
            message: "Please select the role for the new employee:",
            choices: roles.map(role => ({ name: role.title, value: role.id })),
            name: "roleId"
          }
          
        ])
        .then(answers => {
          connection.query(
            `UPDATE employees SET role_id = "${answers.roleId}" WHERE first_name = "${answers.employeeId}"`,
            {
              first_name: answers.employeeId,
              role_id: answers.roleId,
            },
            function (err, res) {
              if (err) throw err;
              console.log(`\n${answers.employeeId}'s role was updated!\n`);
              mainMenu();
            }
          );
        });
    });
  });
}

mainMenu();