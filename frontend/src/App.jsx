import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const API_URL = window.location.origin.replace(":3000", ":8080");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/todos/all`);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      await axios.get(`${API_URL}/api/todos/create?title=${newTodo}`);
      setNewTodo("");
      fetchTodos(); // Fetch updated list
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.get(`${API_URL}/api/todos/delete?id=${id}`);
      fetchTodos(); // Fetch updated list
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .container {
          text-align: center;
          padding: 20px;
        }
        .input-container {
          margin-bottom: 10px;
        }
        input {
          padding: 5px;
          margin-right: 10px;
        }
        button {
          padding: 5px 10px;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          margin: 5px 0;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
}
