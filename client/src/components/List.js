import React, { Fragment, useEffect, useState } from 'react';// importar modulos de react
import EditTodo from './Edit';// importar editar afazer

/*
  * Componente que exibe uma lista de tarefas divididas por status: 'À fazer', 'Em Progresso' e 'Concluído'.
  * Permite ao usuário visualizar, editar e excluir tarefas.
*/

const ListTodo = () => {// listar afazeres

  // Estados para armazenar todas as tarefas e tarefas separadas por status
  const [todos, setTodos] = useState([]); // Todas as tarefas
  const [completedTodos, setCompletedTodos] = useState([]); // Tarefas concluídas
  const [inProgressTodos, setInProgressTodos] = useState([]); // Tarefas em progresso
  const [todoTodos, setTodoTodos] = useState([]); // Tarefas a fazer

  /**
   * Efeito de lado que é executado uma vez após o componente ser montado.
   * Recupera todas as tarefas do servidor.
   */
  useEffect(() => {
    getTodos();// obter afazeres
  }, []);

  /*
    Função para excluir uma tarefa pelo seu ID.
  */
  const deleteTodo = async (id) => {// deletar afazer de forma assincrona no id
    try {
      const deleteTodo = await fetch(`http://localhost:5050/todos/${id}`, {
        method: 'DELETE',
      });

      // Remove a tarefa excluída do estado e atualiza as tarefas separadas por status
      setTodos(todos.filter((todo) => todo.todo_id !== id));// filtra afazer com id diferented o id fornecido

      // updateDerivedStates();
    } catch (error) {
      console.log(error);// exibe erro no console
    }
  };

  /**
   * Função para recuperar todas as tarefas do servidor.
   */
  const getTodos = async () => {// obter afazeres
    try {
      const response = await fetch('http://localhost:5050/todos/');// resposta = aguardar busca no servidor
      const jsonData = await response.json();// dados json = aguardar resposta no formato json
  
      // Define todas as tarefas recuperadas do servidor e atualiza as tarefas separadas por status
      setTodos(jsonData);// definir afazeres como dados json

      console.log('Server data:', todos);// exibe dados do servidor
      // updateDerivedStates();
    } catch (error) {
      console.log(error);
    }
  };
  
  const updateDerivedStates = () => {// atualiza estados derivados
    const updatedCompletedTodos = todos.filter((todo) => todo.status === 'Concluído');// filtra afazeres com o estado concluido
    const updatedInProgressTodos = todos.filter((todo) => todo.status === 'Em Progresso');// filtra afazeres com o estado em progresso
    const updatedTodoTodos = todos.filter((todo) => todo.status === 'À fazer');// filtra afazeres com o estado a fazer
  
    
    console.log('Completed Todos:', updatedCompletedTodos);// exibe no console afazeres concluidos
    console.log('In Progress Todos:', updatedInProgressTodos);// exibe no console afazeres em progresso
    console.log('Todo Todos:', updatedTodoTodos);// exibe no console afazeres a fazer
  
    setCompletedTodos(updatedCompletedTodos);// define afazeres concluidos
    setInProgressTodos(updatedInProgressTodos);// define afazeres em progresso
    setTodoTodos(updatedTodoTodos);// define afazeres a fazer
  };

  const handleSelectChange = async (id, selectedStatus) => {// manipulador de mudanca de selecao por id e estado selecionado
    try {
      const response = await fetch(`http://localhost:5050/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: selectedStatus }),// estado: estado selecionado
      });
  
      const updatedTodos = todos.map((todo) =>
        todo.todo_id === id ? { ...todo, status: selectedStatus } : todo
      );
  
      setTodos(updatedTodos);
      updateDerivedStates();
  
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className='List'>
      <div className='todo-list'>
          <h3 className='text-center mt-5'>À fazer</h3>
          <table className='table mt-5 text-center'>
            <thead>
              <tr>
                <th>Status</th>
                <th>Descrição</th>
                <th>Editar</th>
                <th>Deletar</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo.todo_id}>
                  <td>
                    <select
                      value={todo.status} // valor = estado da tarefa
                      onChange={(e) => handleSelectChange(todo.todo_id, e.target.value)}
                    >
                      <option value="Concluído">Concluído</option>
                      <option value="Em progresso">Em progresso</option>
                      <option value="À fazer">À fazer</option>
                    </select>
                  </td>
                  <td className={todo.status === 'Concluído' ? 'completed-task' : ''}>
                    {/* se estado de afazer for iual a concluido então recebe a classe tarefa concluida, 
                    caso contrario sera vazio  */}
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
              ))}
            </tbody>
          </table>
        </div>
        {/*
        <div className='todo-list'>
          <h3 className='text-center mt-5'>À fazer</h3>
          <table className='table mt-5 text-center'>
            <thead>
              <tr>
                <th>Status</th>
                <th>Descrição</th>
                <th>Editar</th>
                <th>Deletar</th>
              </tr>
            </thead>
            <tbody>
              {todoTodos.map((todo) => (
                <tr key={todo.todo_id}>
                  <td>
                    <select
                      value={todo.in_progress ? 'Em progresso' : todo.completed ? 'Concluído' : 'À fazer'}
                      onChange={(e) => handleSelectChange(todo.todo_id, e.target.value)}
                    >
                      <option value="Concluído">Concluído</option>
                      <option value="Em progresso">Em progresso</option>
                      <option value="À fazer">À fazer</option>
                    </select>
                  </td>
                  <td className="">
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
              ))}
            </tbody>
          </table>
        </div>

        <div className='in-progress todo-list'>
          <h3 className='text-center mt-5'>Em Progresso</h3>
          <table className='in-progress table mt-5 text-center'>
            <thead>
              <tr>
                <th>Status</th>
                <th>Descrição</th>
                <th>Editar</th>
                <th>Deletar</th>
              </tr>
            </thead>
            <tbody>
              {inProgressTodos.map((todo) => (
                <tr key={todo.todo_id}>
                  <td>
                    <select
                      value={todo.completed ? 'Concluído' : 'Em progresso'}
                      onChange={(e) => handleSelectChange(todo.todo_id, e.target.value)}
                    >
                      <option value="Concluído">Concluído</option>
                      <option value="Em progresso">Em progresso</option>
                      <option value="À fazer">À fazer</option>
                    </select>
                  </td>
                  <td className='todo-description'>{todo.description}</td>
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
              ))}
            </tbody>
          </table>
        </div>

        <div className='done todo-list'>
          <h3 className='text-center mt-5'>Concluído</h3>
          <table className='done table mt-5 text-center'>
            <thead>
              <tr>
                <th>Status</th>
                <th>Descrição</th>
                <th>Editar</th>
                <th>Deletar</th>
              </tr>
            </thead>
            <tbody>
              {completedTodos.map((todo) => (
                <tr key={todo.todo_id}>
                  <td>
                    <select
                      value="Concluído"
                      disabled
                    >
                      <option value="Concluído">Concluído</option>
                    </select>
                  </td>
                  <td className='todo-description completed'>{todo.description}</td>
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
              ))}
            </tbody>
          </table>
        </div>
        */}
      </div>
    </Fragment>
  );
};

export default ListTodo;