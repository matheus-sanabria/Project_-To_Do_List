import React, { Fragment, useState } from 'react';

/**
 * Componente InputTodo:
 * Este componente permite a criação de uma nova tarefa (afazer) por meio de um formulário.
 * A tarefa é enviada para o servidor ao ser submetida.
 */
const InputTodo = () => {
  // Estado para armazenar a descrição da nova tarefa
  const [description, setDescription] = useState('');

  // Função para lidar com a submissão do formulário
  const Submiting = async (e) => {
    e.preventDefault();
    try {
      // Constrói o corpo da requisição com a descrição da nova tarefa
      const body = { description };

      // Envia a requisição POST para o servidor com a nova tarefa
      const response = await fetch('http://localhost:5050/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      // Redireciona para a página principal após a adição da nova tarefa
      window.location = '/';
    } catch (error) {
      console.log(error);
    }
  };

  // Renderização do componente
  return (
    <Fragment>
      {/* Título do formulário */}
      <h1 className='text-center mt-5'>Criar tarefa</h1>

      {/* Formulário para adicionar nova tarefa */}
      <form className='width f-flex mt-5' onSubmit={Submiting}>
        <div className='input-group mb-3'>
          {/* Campo de entrada para a descrição da nova tarefa */}
          <input
            type='text'
            className='form-control'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          
          {/* Botão para adicionar a nova tarefa */}
          <button className='btn btn-success' type='submit'>
            Adicionar
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default InputTodo;