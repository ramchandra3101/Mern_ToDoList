const express = require("express");
const mongoose = require("mongoose");
const Cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); //from here server.js has access to .env

const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("./controllers/todoController");

//App config

const app = express();
const port = process.env.PORT || 8000;

const connectionURL = process.env.MONGO_URI;
//MiddileWare config

//Convert to JSON
app.use(express.json());
app.use(Cors()); //to manage headers

//DB config
mongoose
  .connect(connectionURL)
  .then(() => {
    app.listen(port, () => console.log(`Ruuning on Port:${port}`));
  })
  .catch((err) => {
    console.log(err);
    console.log("Unable to connect to MongoDB");
  });
//API Endpoints

//get ToDos List
app.get("/todos", getTodos);
// //create New todo
app.post("/todos", createTodo);
// //Update Todo
app.put("/todos/:id", updateTodo);
// //Delete Todo
app.delete("/todos/:id", deleteTodo);
