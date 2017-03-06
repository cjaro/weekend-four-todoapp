CREATE TABLE chores
(
id int NOT NULL,
name  varchar(255) NOT NULL,
PRIMARY KEY (id) 
);

INSERT INTO chores (id, name)
VALUES ('1', 'running');

INSERT INTO chores (id, name)
VALUES ('2', 'mopping');
