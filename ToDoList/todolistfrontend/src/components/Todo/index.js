import React, { useEffect, useState } from "react";
import { Container } from "./styles";
import axios from "../../axios";
import Form from "../Form";
import TodoList from "../ToDoList";
import Key from "../Key";

function Todo() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/todos");
      setTodos(response.data);
    } catch (err) {
      console.log(err.message);
      console.log("Unable to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addToDo = async (e) => {
    e.preventDefault();
    if (input.length === 0) return null;

    await axios.post("/todos", [
      {
        ...todos,
        text: input,
        completed: false,
      },
    ]);

    fetchData();
    setInput(""); // Correct function name
  };

  return (
    <Container>
      <h2>List of ToDos</h2>
      <Form input={input} setInput={setInput} addToDo={addToDo} />
      <TodoList todos={todos} fetchData={fetchData} />
      <Key />
    </Container>
  );
}

export default Todo;
