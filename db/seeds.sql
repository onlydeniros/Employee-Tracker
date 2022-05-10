INSERT INTO department(name)
VALUE
('Operations'),
('Finance & Accounting'),
('Sales & Marketing'),
('Engineers');

INSERT INTO role(title,salary,department_id)
VALUES
('Operations Manager', 70000, 1),
('Sort Manager', 75000, 1),
('Accountant', 80000, 2),
('Finanical Anylyst', 90000, 2),
('Sales Lead', 68000, 3),
('Sales Manager',77000,3),
('Full Stack Engineer',80000,4),
('Senior Engineer',99000,4);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES
('Forrest','Gump',2,2),
('Moby','Dick',1,1),
('Peter','Pantz',3,null),
('Rick','Morty',3,3),
('Danny','Phantom',4,null),
('Drake','Josh',4,4),
('Chuck','Norris',1,null);
