const mongoose = require("mongoose");
const ToDos = require("../dbToDos");

const getTodos = async (req, res) => {
  try {
    const allTodos = await ToDos.find({}).sort({ createdAt: -1 });
    res.status(200).send(allTodos);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const createTodo = async (req, res) => {
  const dbTodo = req.body;
  try {
    const newTodo = await ToDos.create(dbTodo);
    res.status(201).send(newTodo);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const updateTodo = async (req, res) => {
  const { id } = req.params;

  try {
    // Check id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No Todo with that ${id}`);
    }
    const ToDoID = { _id: id };
    const update = { completed: true };

    const updatedTodo = await ToDos.findOneAndUpdate(ToDoID, update, {
      new: true,
    });
    if (!updatedTodo) {
      return res.status(405).send(`No Todo with that ${id}`);
    }

    res.status(200).send(updatedTodo);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    // Check id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(406).send(`No Todo with that ${id}`);
    }
    const deleteTodo = await ToDos.findOneAndDelete({ _id: id });
    if (!deleteTodo) {
      return res.status(407).send(`No Todo with that ${id}`);
    }

    res.status(200).send(deleteTodo);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
