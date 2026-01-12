
import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { toggleComplete } from "../context/TaskContext";

// Component for displaying and managing the task list
function TaskList({query}) {
    const {tasks, setTasks} = useContext(TaskContext);
    const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(query.toLowerCase())
  );

// Handle task completion toggle
  function handleToggle(task) {
  if (!task || !task.id) return;
  const newCompleted = !task.completed;
  toggleComplete(task.id, newCompleted)
    .then((data) => {
      if (data) {
        setTasks((tasks) =>
          tasks.map((t) => (t.id === task.id ? data : t))
        );
      } else {
        console.log("PATCH failed or returned null for task id:", task.id);
      }
    })
    .catch((err) => console.error(err));
  };

  //  Render the filtered task list
  return (
    <ul>
      {filteredTasks.map((task) => (
        <li key={task.id}>
          <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
            {task.title}
          </span>
          <button data-testid={task.id} onClick={() => handleToggle(task)}>
            {task.completed ? "Undo" : "Complete"}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
