CREATE DATABASE todolist;
-- CRIAR BANDO_DE_DADOS nome_banco_de_dados

CREATE TABLE todo(todo_id SERIAL PRIMARY KEY, description VARCHAR(255));
-- CRIAR TABELA nome_tabeça(
                        -- nome_colunaId TIPO_DADO_CHAVE_PRIMARIA,
                        -- nome_colunaDescrição TIPO_DADO_CARACTERES(MAX255));

INSERT INTO todo (description) VALUES($1) RETURNING *;
-- INSERIR DENTRO DE nome_tabela (nome_coluna) VALORES($1-PRIMEIRO) RETORNAR TUDO


UPDATE todo SET description = $1 WHERE todo_id = $2;
-- ATUALIZAR nome_tabela DEFINIR nome_coluna = calor1 QUANDO nome_coluna = valor2

DELETE FROM todo WHERE todo_id = $1;
-- DELETE de nome_tabla QUANDO nome_coluna = valor 1