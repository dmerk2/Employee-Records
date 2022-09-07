DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
  id INT,
  name VARCHAR(30),
  PRIMARY KEY(id)
);

CREATE TABLE role (
  id INT,
  title VARCHAR(30),
  salary DECIMAL,
  order_details TEXT,
  department_id INT,
  FOREIGN KEY (department_id) 
);
