import React, { useEffect, useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskForm from "./TaskForm";
import SearchBar from "./SearchBar";

function App() {
  // Access tasks and setTasks from context
  const { tasks, setTasks } = useContext(TaskContext);

  // Fetch tasks on component mount
  useEffect(() => {
    fetch('http://localhost:6001/tasks')
    .then(r=>r.json())
    .then(data=>setTasks(data))
    .catch(err=>console.error(err));
  }, []); // Empty dependency array to run only once on mount

  // Render the main application
  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm />
      <SearchBar />
    </div>
  );
};

export default App;
