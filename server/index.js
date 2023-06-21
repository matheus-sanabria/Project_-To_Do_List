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
// Criar item
// Atualizar item
// Visualizar item
// Deletar item

app.listen(5050, () => {
    console.log('O servidor está rodando em http://localhost:5050')
})