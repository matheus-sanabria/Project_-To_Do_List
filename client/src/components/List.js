import React, { Fragment, useEffect, useState } from 'react'

const ListTodo = () => {
    const [todos, setTodos] = useState([])
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
                                onClick={() => alert('Deletado')}
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