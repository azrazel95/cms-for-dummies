const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('./node_modules/inquirer')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'Sagittarius95!'
  });

  connection.query(
    'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );

  connection.query(
    'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
    ['Page', 45],
    function(err, results) {
      console.log(results);
    }
  );