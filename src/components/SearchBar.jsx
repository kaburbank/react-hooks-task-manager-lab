import React, { useRef, useState, useContext, useEffect } from "react";
import TaskList from "./TaskList";
import { TaskContext } from "../context/TaskContext";

function SearchBar() {
  // State for search query
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  // Handle search input changes
  function handleSearch(e) {
    setQuery(e.target.value);
  };

  // Focus the input field on component mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Render the search bar and task list
  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search tasks..."
        value={query}
        onChange={handleSearch}
      />
      <TaskList query={query}/>
    </div>
  );
};

export default SearchBar;
