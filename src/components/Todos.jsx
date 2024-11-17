import TodoCard from "./TodoCard";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("src/todos.json");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => {
      if (todo.title === "CantDelete") {
        return true;
      } else return todo.id !== id;
    });
    setTodos(newTodos);
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setTitle(todoToEdit.title);
    setDescription(todoToEdit.description);
    setEditing(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      const todoToEdit = todos.find((todo) => todo.id === editing);
      todoToEdit.title = e.target.title.value;
      todoToEdit.description = e.target.description.value;
      setEditing(null);
    } else {
      const newTodos = [
        ...todos,
        {
          id: uuidv4(),
          title: e.target.title.value,
          description: e.target.description.value,
        },
      ];
      setTodos(newTodos);
    }

    setTitle("");
    setDescription("");
  };

  return (
    <div>
      <div>
        <h2>Add a Todo</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What has to be done?"
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell me more about it!"
            />
          </div>
          <button type="submit">{editing ? "Edit" : "Add"}</button>
        </form>
      </div>

      <h1>All Todos</h1>
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          title={todo.title}
          description={todo.description}
          handleDelete={() => handleDelete(todo.id)}
          handleEdit={() => handleEdit(todo.id)}
        />
      ))}
    </div>
  );
}
