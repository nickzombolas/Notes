const express = require('express')
const bodyParser = require('body-parser')

const db = require('./db/db')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });

// GET requests
app.get('/api/v1/todos', (req, res) => {
    console.log('getcalled')
    res.status(200).send({
        success: 'true',
        message: 'todos retrieved successfully',
        todos: db,
    })
})

app.get('/api/v1/todos/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    const id = parseInt(req.params.id, 10)
    db.map(todo => {
        if (todo.id === id)
            return res.status(200).send({
                success: 'true',
                message: 'todo retrieved successfully',
                todo
            })
    })
    return res.status(404).send({
        success: 'false',
        message: 'todo does not exist'
    })
})

// POST requests
app.post('/api/v1/todos', (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({
            success: 'false',
            message: 'Title is required'
        })
    }
    else if (!req.body.description) {
        return res.status(400).send({
            success: 'false',
            message: 'Description is required'
        })
    }
    const todo = {
        id: db.length + 1,
        title: req.body.title,
        description: req.body.description
    }
    db.push(todo)
    return res.status(201).send({
        success: 'true',
        message: 'todo added successfully'
    })
})

// DELETE requests
app.delete('/api/v1/todos/:id', (req, res) =>{
    const id = parseInt(req.params.id)
    db.map((todo, index) => {
        if (todo.id === id) {
            db.splice(index, 1)
            return res.status(200).send({
                success: 'true',
                message: 'todo deleted successfully',
            })
        }
    })
    return res.status(404).send({
        success: 'false',
        message: 'todo not found'
    })
})

//PUT requests
app.put('/api/v1/todos/id', (req, res) => {
    const id = parseInt(req.params.id, 10)
    let todoFound
    let itemIndex
    db.map((todo, index) => {
        if (todo.id === id) {
            todoFound = todo
            itemIndex = index
        }
        if (!todoFound) {
            return res.status(404).send({
                success: 'false',
                message: 'todo not found',
            })
        }
        if (!req.body.title){
            return res.status(400).send({
                success: 'false',
                message: 'title required'
            })
        }
        else if (!req.body.description){
            return res.status(400).send({
                success: 'false',
                message: 'description required'
            })
        }
    })
    const updatedTodo = {
        id: todoFound.id,
        title: req.body.title || todoFound.title,
        description: req.body.description || todoFound.description
    }
    db.splice(itemIndex, 1, updatedTodo)
    return res.status(201).send({
        success: 'true',
        message: 'todo updated successfully',
        updatedTodo
    })
})

const PORT = 5000
app.listen(PORT, () => {
    console.log('server running on port ' + PORT)
})