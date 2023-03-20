-- establishes our schema, dropping old db and recreating it
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
-- selecting said db
USE employee_db;
-- creates department table with a primary key of id
CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);
-- creates role table with a primary key of id, referencing department id's foreign key for relations
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title varchar(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
    -- on deletion of foreign key, it sets to null
    ON DELETE SET NULL
);

CREATE TABLE employees (
  -- creates employees table with a primary key of id, referencing role's id's foreign key for relations
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,  
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
     -- on deletion of foreign key, it sets to null
    ON DELETE SET NULL
);