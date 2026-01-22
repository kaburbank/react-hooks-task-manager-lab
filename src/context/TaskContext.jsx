import React, { createContext, useState } from "react";

const baseURL = "http://localhost:6001"

// Create TaskContext and TaskProvider
export const TaskContext = createContext();

// Provider component to wrap the app and provide task state
export function TaskProvider({ children }) {
  // State to hold tasks
  const [tasks, setTasks] = useState([]);

  // Provide tasks and setTasks to children components
  return (
    <TaskContext.Provider value={{tasks, setTasks}}>
    {children}
    </TaskContext.Provider>
  );
};

// Function to toggle task completion status
export async function toggleComplete (id, completed) {
  if (id) {
    const url = `${baseURL}/tasks/${id}`;
    try {
      const r = await fetch(url, {
        method: "PATCH",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({completed: completed}),
      });
      if (r.ok) {
        const data = await r.json();
        return data;
      }
      console.log(`PATCH request failed at ${ url }. Response: ${ r.status } `);
      return null;
    } catch (err) {
      console.error("Error toggling task:", err);
      return null;
    }
  }
};

// Function to add a new task
export async function addTask (newTask){
  if (newTask) {
    const url = `${baseURL}/tasks`;
    const r = await fetch(url, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newTask),
    });
    if (r.ok) {
      const data = await r.json();
      return data;
    }
    console.log(`POST request failed at ${ url }. Response: ${ r.status }`)
    return null;
  };
};