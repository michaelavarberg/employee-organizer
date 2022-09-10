INSERT INTO department (name)
VALUES ("Analysts"),
        ("Sales"),
        ("Technology");


INSERT INTO roles (title, salary, department_id)
VALUES ("Junior Analyst", 80000, 1),
        ("Senior Analyst", 120000, 1),
        ("Head of Analytics", 150000, 1),
        ("Junior Sales Rep", 60000, 2),
        ("Senior Sales Rep", 95000, 2),
        ("Head of Sales", 130000, 2),
        ("Junior Technical Engineer", 100000, 3),
        ("Senior Technical Engineer", 150000, 3),
        ("Head of Technology", 175000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Mary", "Smith", 9, NULL),
        ("Alex", "Brown", 6, NULL),
        ("Ron", "Clark", 3, NULL),
        ("John", "Lewis", 7, 1),
        ("Michaela", "Varberg", 1, 3),
        ("Peter", "Newman", 2, 3),
        ("JoJo", "Felkins", 4, 2),
        ("Amy", "Dutt", 1, 3),
        ("Bogey", "Phillips", 8, 1);
