DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
  id INT,
  name VARCHAR(30),
  PRIMARY KEY(id)
);

CREATE TABLE employee (
  id INT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT
);

CREATE TABLE role (
  id INT,
  title VARCHAR(30),
  salary DECIMAL,
  order_details TEXT,
  department_id INT,
  FOREIGN KEY (department_id)
);