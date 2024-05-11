import React, { Fragment, useState } from "react";

/**
 * Componente EditTodo:
 * Este componente permite a edição de um afazer (tarefa) por meio de um modal.
 * O modal exibe um formulário para editar a descrição do afazer.
 * As alterações são enviadas para o servidor ao serem salvas.
 */
const EditTodo = ({ todo }) => {
    // Estado para armazenar a descrição atualizada do afazer
    const [description, setDescription] = useState(todo.description);

    // Função para atualizar a descrição do afazer
    const updateDescription = async (e) => {
        e.preventDefault();
        try {
            // Constrói o corpo da requisição com a nova descrição
            const body = { description };

            // Envia uma requisição PUT para atualizar a descrição no servidor
            const response = await fetch(`http://localhost:5050/todos/${todo.todo_id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            // Redireciona para a página principal após a atualização
            window.location = "/";
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Fragment>
            {/* Botão para abrir o modal de edição */}
            <button
                type="button"
                className="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target={`#id${todo.todo_id}`}
            >
                Editar
            </button>

            {/* Modal de edição */}
            <div
                className="modal"
                id={`id${todo.todo_id}`}
                onClick={() => setDescription(todo.description)}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4>Editar afazer</h4>
                            {/* Botão para fechar o modal */}
                            <button
                                type="button"
                                className="close"
                                data-bs-dismiss="modal"
                                onClick={() => setDescription(todo.description)}
                            >
                                X
                            </button>
                        </div>

                        <div className="modal-body">
<<<<<<< HEAD
                            <label for={description}>Descrição:</label>
                            <input 
=======
                            {/* Campo de entrada para a nova descrição do afazer */}
                            <input
>>>>>>> 06e6b5acf64da020a62dbe47f98cc3410c82b81a
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="modal-footer">
                            {/* Botão para salvar as alterações */}
                            <button
                                type="button"
                                className="btn btn-success"
                                data-bs-dismiss="modal"
                                onClick={(e) => updateDescription(e)}
                            >
                                Editar
                            </button>
                            {/* Botão para fechar o modal sem salvar alterações */}
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={() => setDescription(todo.description)}
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditTodo;