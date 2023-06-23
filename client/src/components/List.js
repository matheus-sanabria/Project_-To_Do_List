import React, { Fragment, useEffect, useState } from 'react'

const ListTodo = () => {
    const [todos, setTodos] = useState([])

    const deleteTodo = async id => {
        try {
            // utilizamos crase quando precisamos inserir um valor de script dentro da string
            const deleteTodo = await fetch(`http://localhost:5050/todos/${id}`, {
                method: 'DELETE'
            }) 

            setTodos(todos.filter(todo => todo.todo_id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    const getTodos = async () => {
        try{
            const response = await fetch('http://localhost:5050/todos/')
            const jsonData = await response.json()

            setTodos(jsonData)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTodos()
    }, [])

    return (
        <Fragment>
            <table className='table mt-5 text-center'>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Editar</th>
                        <th>Deletar</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td>Editar</td>
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
        </Fragment>
    )
}

export default ListTodo;