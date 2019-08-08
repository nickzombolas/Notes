const express = require('express')
const bodyParser = require('body-parser')

const db = require('./db/db')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// GET requests
app.get('/api/posts', (req, res) => {
  console.log('getcalled')
  res.status(200).send({
    success: 'true',
    message: 'posts retrieved successfully',
    posts: db,
  })
})

app.get('/api/posts/:id', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  const id = parseInt(req.params.id, 10)
  db.map(post => {
    if (post.id === id)
      return res.status(200).send({
        success: 'true',
        message: 'post retrieved successfully',
        todo
      })
  })
  return res.status(404).send({
    success: 'false',
    message: 'post does not exist'
  })
})

// POST requests
app.post('/api/posts', (req, res) => {
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
  const post = {
    id: db.length + 1,
    title: req.body.title,
    description: req.body.description
  }
  db.push(post)
  return res.status(201).send({
    success: 'true',
    message: 'post added successfully'
  })
})

// DELETE requests
app.delete('/api/posts/:id', (req, res) => {
  const id = parseInt(req.params.id)
  db.map((post, index) => {
    if (post.id === id) {
      db.splice(index, 1)
      return res.status(200).send({
        success: 'true',
        message: 'post deleted successfully',
      })
    }
  })
  return res.status(404).send({
    success: 'false',
    message: 'post not found'
  })
})

// PUT requests
app.put('/api/v1/todos/id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  let postFound
  let itemIndex
  db.map((post, index) => {
    if (post.id === id) {
      postFound = post
      itemIndex = index
    }
    if (!postFound) {
      return res.status(404).send({
        success: 'false',
        message: 'post not found',
      })
    }
    if (!req.body.title) {
      return res.status(400).send({
        success: 'false',
        message: 'title required'
      })
    }
    else if (!req.body.description) {
      return res.status(400).send({
        success: 'false',
        message: 'description required'
      })
    }
  })
  const updatedPost = {
    id: postFound.id,
    title: req.body.title || postFound.title,
    description: req.body.description || postFound.description
  }
  db.splice(itemIndex, 1, updatedPost)
  return res.status(201).send({
    success: 'true',
    message: 'post updated successfully',
    updatedPost
  })
})

const PORT = 5000
app.listen(PORT, () => {
  console.log('server running on port ' + PORT)
})