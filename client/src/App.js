import React, { Fragment } from 'react';
import './App.css';

// Importa os componentes necessários
import InputTodo from './components/Input';
import ListTodo from './components/List';

/**
 * Componente principal App:
 * Este componente é a entrada principal da aplicação. Ele renderiza o formulário de entrada
 * e a lista de afazeres. Utiliza os componentes InputTodo e ListTodo.
 */
function App() {
  return (
    <Fragment>
      {/* Container principal da aplicação */}
      <div className='container'>
        {/* Componente para adicionar novas tarefas (afazeres) */}
        <InputTodo />

        {/* Componente para exibir a lista de tarefas (afazeres) */}
        <ListTodo />
      </div>
    </Fragment>
  );
}

// Exporta o componente App para ser utilizado na aplicação
export default App;