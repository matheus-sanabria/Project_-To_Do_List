CREATE DATABASE todolist;

CREATE TABLE todo(todo_id SERIAL PRIMARY KEY, description VARCHAR(255));

INSERT INTO todo (description) VALUES($1) RETURNING *;