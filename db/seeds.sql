-- according to example for the module
INSERT INTO department(name)

VALUES
("Sales"),
("Engineering"),
("Finance");
("Legal");

INSERT INTO role (title, salary, department_id)

VALUES
("Lawyer, 100000, 4"),
("Legal Team Lead, 175000, 4"),
("Software Engineer, 195000, 2"),
("Lead Engineer, 235000, 2"),
("Account Manager, 110000, 3"),
("Accountant, 100000, 3"),
("Sales Team Lead, 120000, 1"),
("Salesman, 95000, 1");

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)

VALUES
(1, "Emily", "Johnson", 1, 1),
(2, "Liam", "Martinez", 2, 2),
(3, "Olivia", "Lee", 3, 3),
(4, "Ethan", "Chen", 4, 1),
(5, "Ava", "Bransten", 5, 2),
(6, "William", "Kinds", 6, 3),
(7, "Sophia", "Nguyen", 7, 2),
(8, "Noah", "Davis", 3, 3);
