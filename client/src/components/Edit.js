import React, { Fragment, useState } from "react";

const EditTodo = ({ todo }) => {// constante EditTodo = ({ parametro }) => (arrow function){}

    const [description, setDescription] = useState(todo.description) // constante, parametro, definir parametro = usarEstado ()

    const updateDescription = async e => { //constante atualizarDescricao = assincrona evento arrowFunction {}
        e.preventDefault();// evento prevencao padrao
        // console.log('123');
        
        try {// tentar
            const body = { description }; // constante_corpo = { parametro description}
            const response = await fetch(`
            http://localhost:5050/todos/${todo.todo_id}
            `,
            { // constante resposta = aguarde busca (endereco de busca $(valor)tabela_todo coluna_todo_id)
                    method: 'PUT', // metodo : "COLOCAR"
                    headers:  { "Content-Type": "application/json" }, // cabecalhos : {"Tipo_Conteudo" : "aplicacao/json" }
                    body: JSON.stringify(body) // corpo : JSON.restringir(constante_corpo)
                }
            )
            window.location = "/" // janela.localização = "/"
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target={`#id${todo.todo_id}`}
            >
                Editar
            </button>
            <div
                className="modal"
                id={`id${todo.todo_id}`}
                onClick={() => setDescription(todo.description)}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4>Editar afazer</h4>
                            <button
                                type="button"
                                className="close"
                                data-bs-dismiss="modal"
                                onClick={() => setDescription(todo.description)}
                            >
                                X
                            </button>
                        </div>{/* modal-header */}

                        <div className="modal-body">
                            <label for={description}>Descrição:</label>
                            <input 
                                type="text"
                                className="form-control"
                                value={description} //valor = (const descrição)
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>{/* modal-body */}

                        <div className="modal-footer">
                            <button
                                type="button"//tipo = botao
                                className="btn btn-success"//nome classe = btn btn-aviso
                                data-bs-dismiss="modal"//dados bs fechar = modal
                                onClick={e => updateDescription(e)}//evento = atualizarDescrição(evento)
                            >
                                Editar
                            </button>
                            <button
                                type="button" //tipo = botao
                                className="btn btn-danger" //nome classe = btn btn-perigo
                                data-bs-dismiss="modal" //dados bs fechar = modal
                                onClick={() => setDescription(todo.description)}//noclick = definirDescrição(tabela todo. coluna descricao)
                            >
                                Fechar
                            </button>
                        </div>{/* modal-footer */}
                    </div>{/* modal-content */}
                </div>{/* modal-dialog */}
            </div>{/* modal */}
        </Fragment>
    ) 
};

export default EditTodo;