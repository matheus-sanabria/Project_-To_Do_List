CREATE DATABASE todolist;

CREATE TABLE todo(todo_id SERIAL PRIMARY KEY, description VARCHAR(255));

INSERT INTO todo (description) VALUES($1) RETURNING *;

UPDATE todo SET description = $1 WHERE todo_id = $2;
-- ATUALIZAR nome_tabela DEFINIR nome_coluna QUANDO nome_coluna = valor2

DELETE FROM todo WHERE todo_id = $1;