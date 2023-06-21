const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')

// Middleware
app.use(cors())
app.use(express.json())

// app.get('/todos', (req,res) => {
//         res.json()
// })
    
// Rotas
// inserir item
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",
        [description]
        )
        res.json(newTodo.rows[0])
    } catch (error){
        // console.error(error.message)
        console.log(error)
    }
})

// Listar
app.get('/todos/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const todo = await pool.query('SELECT * FROM todo where todo_id = $1', [id])
        res.json(todo.rows[0])
    } catch (error){
        console.log(error)
    }
})

// Listar

app.get('/todos/', async(req, res) => {
    try{
        const {id} = req.params;
        const todo = await pool.query('SELECT * FROM todo')
        res.json(todo.rows)
    } catch (error){
        console.log(error)
    }
})

app
// Atualizar item
// Visualizar item
// Deletar item

app.listen(5050, () => {
    console.log('O servidor está rodando em http://localhost:5050')
})