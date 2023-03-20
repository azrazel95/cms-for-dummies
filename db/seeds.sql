-- seeding department table
INSERT INTO departments(id, department_name)
VALUES (001, 'economics'),
      (002, 'astrology'),
      (003, 'wallstreetBets analytics'),
      (004, 'chick fil a attendant');
-- seeding roles table 
INSERT INTO roles(id, title, salary, department_id)
VALUES (001, 'miner', 55000, 003),
      (002, 'party leader', 45000, 002),
      (003, 'self respecting capitalist', 40000, 004);
-- seeding employees table
insert into employees(id, first_name, last_name, role_id, manager_id)
values (001, 'sasha', 'Sprenger', 001, NULL),
      (002, 'earhart', 'amelia', 003, 002),
      (003, 'iosif', 'dodek', 001, 002),
      (004, 'vladimir', 'kaba', 001, 002);
      