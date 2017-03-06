CREATE TABLE chores(
	id SERIAL PRIMARY KEY,
	name VARCHAR (255) NOT NULL
);

INSERT INTO chores (id, name)
VALUES ('1', 'running');

INSERT INTO chores (id, name)
VALUES ('2', 'mopping');

INSERT INTO chores (name)
VALUES ('running');
