import React, { useState } from "react";
import "./ToDo.css";

function ToDo() {
  const [tasks, setTasks] = useState([]); //este sera el array de las tareas
  const [newTask, setNewTasks] = useState(""); // valor del input

  const handleAdd = () => {
    if (newTask.trim() === "") return; //evbta agregar tareas vacias

    const task = {
      id: Date.now(), // id de inicio
      text: newTask,
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTasks(""); // limpiar input
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggle = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="container">
      <h2>To Do</h2>
      <div className="container_input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTasks(e.target.value)}
        />
        <button onClick={handleAdd}>add</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            onClick={() => handleToggle(task.id)}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              color: task.completed ? "#888" : "#000",
              cursor: "pointer",
            }}
          >
            {task.text}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(task.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {tasks.length === 0 && <p>No Hay Tareas Aún</p>}
    </div>
  );
}
export default ToDo;
