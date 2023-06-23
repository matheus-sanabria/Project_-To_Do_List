import React, { Fragment, useState } from 'react';

const InputTodo = () => {
    const [description, setDescription] = useState('')

    const Submiting = async e => {
        e.preventDefault()
        try{
            const body = { description }
            const response = await fetch('http://localhost:5050/todos/', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(body)
            })
            window.location = "/"
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Fragment>
            <h1 className='text-center mt-5'>Afazeres</h1>
            <form className='width f-flex mt-5' onSubmit={Submiting}>
                <div className="input-group mb-3">                    
                    <input  
                        type='text' 
                        className="form-control"
                        // className='form-control' 
                        value={description} 
                        onChange={e => setDescription(e.target.value)}
                    />
                    <button className='btn btn-success' type="submit">Adicionar</button>
                </div>
            </form>
        </Fragment>
    )
}
export default InputTodo;