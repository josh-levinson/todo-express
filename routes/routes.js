const express = require('express');

const router = express.Router()
const Todo = require('../models/todo');

//Post Method
router.post("/todos", async (req, res) => {
  const todo = new Todo({
    description: req.body.description,
    complete: req.body.complete,
  });

  try {
    const todoToSave = await todo.save();
    res.status(200).json(todoToSave)
  }
  catch (error) {
    res.status(400).json({message: error.message})
  }
});

//Get all Method
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos)
  }
  catch(error){
    res.status(500).json({message: error.message})
  }
})

//Get by ID Method
router.get('/todos/:id', async (req, res) => {
  try{
    const todo = await Todo.findById(req.params.id);
    res.json(data)
  }
  catch(error){
    res.status(500).json({message: error.message})
  } 
})

//Update by ID Method
router.patch('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedTodo = req.body;
    const options = { new: true };

    const result = await Todo.findByIdAndUpdate(
      id, updatedData, options
    )

    res.send(result)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//Delete by ID Method
router.delete('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findByIdAndDelete(id)
    res.send(`Document with ${todo.id} has been deleted..`)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  } 
})

module.exports = router;