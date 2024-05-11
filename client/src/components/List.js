import React, { Fragment, useEffect, useState } from 'react';
import EditTodo from './Edit';

/**
 * Componente ListTodo:
 * Este componente exibe uma lista de afazeres e afazeres concluídos em duas tabelas separadas.
 * Permite a marcação de afazeres como completos, edição e exclusão de afazeres.
 */
const ListTodo = () => {
  // Estado para armazenar todos os afazeres não concluídos
  const [todos, setTodos] = useState([]);
  // Estado para armazenar todos os afazeres concluídos
  const [completedTodos, setCompletedTodos] = useState([]);

  // Função para deletar um afazer
  const deleteTodo = async (id) => {
    try {
      // Chamada para excluir o afazer no servidor
      const deleteTodo = await fetch(`http://localhost:5050/todos/${id}`, {
        method: 'DELETE',
      });

      // Atualiza o estado removendo o afazer excluído
      setTodos(todos.filter((todo) => todo.todo_id !== id));

      // Verifica se o afazer excluído está na lista de completos e o remove
      const isCompleted = todos.find((todo) => todo.todo_id === id)?.completed;
      if (isCompleted) {
        setCompletedTodos(completedTodos.filter((todo) => todo.todo_id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Função para obter todos os afazeres do servidor
  const getTodos = async () => {
    try {
      // Chamada para obter a lista de afazeres do servidor
      const response = await fetch('http://localhost:5050/todos/');
      // Converte a resposta para formato JSON
      const jsonData = await response.json();

      // Separa os afazeres completos e não completos
      const completed = jsonData.filter((todo) => todo.completed);
      const notCompleted = jsonData.filter((todo) => !todo.completed);

      // Atualiza os estados com os afazeres completos e não completos
      setTodos(notCompleted);
      setCompletedTodos(completed);
    } catch (error) {
      console.log(error);
    }
  };

  // Função para lidar com a mudança do estado do checkbox
  const handleCheckboxChange = (id) => {
    // Cria uma cópia dos afazeres
    const updatedTodos = todos.map((todo) =>
      // Atualiza o estado 'completed' do afazer selecionado
      todo.todo_id === id ? { ...todo, completed: !todo.completed } : todo
    );

    // Atualiza o estado dos afazeres
    setTodos(updatedTodos);

    // Encontra o afazer na cópia atualizada
    const todoToUpdate = updatedTodos.find((todo) => todo.todo_id === id);

    // Se o afazer agora estiver completo, move-o para a lista de completos
    if (todoToUpdate.completed) {
      setCompletedTodos([...completedTodos, todoToUpdate]);
    } else {
      // Se não estiver completo, remove-o da lista de completos (se estiver lá)
      setCompletedTodos(completedTodos.filter((todo) => todo.todo_id !== id));
    }
  };

  // Efeito de lado para obter os afazeres ao montar o componente
  useEffect(() => {
    getTodos();
  }, []);

  // Renderização do componente
  return (
    <Fragment>
<<<<<<< HEAD
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
=======
      {/* Tabela de Afazeres */}
      <div className='List'> 

    {/* Verifica se há afazeres não concluídos antes de renderizar a tabela */}
       <div className='todo-list'>
       <h3 className='text-center mt-5'>Afazeres</h3>
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
           {/* Mapeia e renderiza afazeres não completos */}
           {todos.map((todo) => (
             !todo.completed && (
               <tr key={todo.todo_id}>
                 <td>
                   {/* Checkbox para marcar o afazer como completo */}
                   <input
                     type='checkbox'
                     id={`checkbox-${todo.todo_id}`}
                     checked={todo.completed}
                     onChange={() => handleCheckboxChange(todo.todo_id)}
                   />
                 </td>
                 {/* Descrição do afazer */}
                 <td className={todo.completed ? 'todo-description completed' : 'todo-description'}>
                   {todo.description}
                 </td>
                 {/* Componente para editar o afazer */}
                 <td>
                   <EditTodo todo={todo} />
                 </td>
                 {/* Botão para deletar o afazer */}
                 <td>
                   <button
                     className='btn btn-danger'
                     onClick={() => deleteTodo(todo.todo_id)}
                   >
                     Deletar
                   </button>
                 </td>
               </tr>
             )
           ))}
         </tbody>
       </table>
     </div>

    {/* Verifica se há afazeres concluídos antes de renderizar a tabela */}
    {completedTodos.length > 0 && (
      <div className='done-list'>

        {/* Tabela de Afazeres Concluídos */}
        <h3 className='text-center mt-5'>Concluídos</h3>

        <table className='done table mt-5 text-center'>
          <thead>
            <tr>
              <th></th>
              <th>Descrição</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapeia e renderiza afazeres completos */}
            {completedTodos.map((todo) => (
              <tr key={todo.todo_id}>
                <td>
                  {/* Checkbox para marcar o afazer como incompleto */}
                  <input
                    type='checkbox'
                    id={`checkbox-${todo.todo_id}`}
                    checked={todo.completed}
                    onChange={() => handleCheckboxChange(todo.todo_id)}
                  />
                </td>
                {/* Descrição do afazer completo */}
                <td className='todo-description completed'>{todo.description}</td>
                {/* Componente para editar o afazer */}
                <td>
                  <EditTodo todo={todo} />
                </td>
                {/* Botão para deletar o afazer */}
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
    )}
      </div>
>>>>>>> 06e6b5acf64da020a62dbe47f98cc3410c82b81a
    </Fragment>
  );
};

export default ListTodo;
