INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Jason", 'Hart', 10, 1),
  ("Michael", 'Smith', 02, 2),
  ("Mathew", "Doe", 19, 2),
  ("Katie", "Monroe", 88, 2),
  ("Ariel", "Mermaid", 34, 5);

INSERT INTO department (department_name)
VALUES ('Management');
INSERT INTO department (department_name)
VALUES ('Sales');
INSERT INTO department (department_name)
VALUES ('Tech');
INSERT INTO department (department_name)
VALUES ('Customer Service');

INSERT INTO role (title, salary, department_id)
VALUES ('Manager', 85236, 1);
INSERT INTO role (title, salary, department_id)
VALUE ('Engineer', 92456, 2);
INSERT INTO role (title, salary, department_id)
VALUE ('Engineer', 87000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ('Intern', 65923, 4);