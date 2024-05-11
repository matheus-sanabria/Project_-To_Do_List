const express = require('express')
const cors = require('cors')
const pool = require('./db')
const app = express()

// Middleware
app.use(cors())// app use cors
app.use(express.json())// app use express no formato json

// app.get('/todos', (req,res) => {
//         res.json()
// })
    
// Rotas
// inserir item
app.post("/todos", async (req, res) => {// app postar no caminho "/todos", func assincrona(par_requisicao, par_resposta) funcao de flecha
    try {// tente
        const { description } = req.body;// const { descricao } valor igual ao par_respost chamar corpo

        // const novoAfazer = aguarde consulta de pool("INSERIR EM afazer (tabela_descricao) VALORES($1) RETORNANDO *")
        
        const newTodo = await pool.query("INSERT INTO todos (description) VALUES($1) RETURNING *;", [description]);// const descricao
        
        res.json(newTodo.rows[0]);// par_resposta chamar metodo json em(novoAfazer chamar linhas[indice_0])
    } catch (error){
        // console.error(error.message)
        console.log(error);
    }
});



// Listar
app.get('/todos/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const todos = await pool.query('SELECT * FROM todos where todo_id = $1', [id])
        res.json(todos.rows[0])
    } catch (error){
        console.log(error)
    }
})

// Listar todos
app.get('/todos/', async(req, res) => {
    try{
        const {id} = req.params;
        const todos = await pool.query('SELECT * FROM todos')
        res.json(todos.rows)
    } catch (error){
        console.log(error)
    }
})

// Atualizar itemz
app.put('/todos/:id', async (req, res) => {
    try{
        const { id } = req.params
        const { description } = req.body
        
        const updateTodo = await pool.query(
            "UPDATE todos SET description, status = $1 WHERE todo_id = $2",
            [description, id]
        )
        res.json('Item atualizado!')
    } catch (error){
        console.log(error)
    }
})
// Deletar item
app.delete('/todos/:id', async (req, res) => {
    try{
        const { id } = req.params
        const {description} = req.body
        const deleteTodo = await pool.query(
            "DELETE FROM todos WHERE todo_id = $1",
            [id]
        )
        res.json("Item deletado com sucesso!")
    } catch (error){
        console.log(error)
    }
})

app.listen(5050, () => {
    console.log('O servidor To-to-list está rodando em http://localhost:5050/todos')
})