import React, { Fragment, useEffect, useState } from 'react';
import EditTodo from './Edit';

const ListTodo = () => {
  const [todos, setTodos] = useState([]);

  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5050/todos/${id}`, {
        method: 'DELETE',
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch('http://localhost:5050/todos/');
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = (id) => {
    // Crie uma cópia dos todos e encontre o todo com o ID correspondente
    const updatedTodos = [...todos];
    const todoToUpdate = updatedTodos.find((todo) => todo.todo_id === id);

    // Inverta o estado 'completed' do todo selecionado
    todoToUpdate.completed = !todoToUpdate.completed;

    // Atualize o estado com a cópia atualizada dos todos
    setTodos(updatedTodos);
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      <table className='table mt-5 text-center'>
        <thead>
          <tr>
            <th></th>
            <th>Descrição</th>
            <th>Editar</th>
            <th>Deletar</th>
          </tr>
        </thead>
        <tbody>
          {
          todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>
                <input
                  type='checkbox'
                  id={`checkbox-${todo.todo_id}`}
                  checked={todo.completed}
                  onChange={() => handleCheckboxChange(todo.todo_id)}
                />
              </td>
              <td className={todo.completed ? 'todo-description completed' : 'todo-description'}>
                {todo.description}
              </td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className='btn btn-danger'
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodo;
