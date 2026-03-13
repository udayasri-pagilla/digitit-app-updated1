import React, { useEffect, useState, useCallback } from "react";
import TaskForm from "../forms/TaskForm";
import TaskCard from "../components/TaskCard";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from "../services/taskService";

// Dashboard component
// This is the main page where users can create, view, update, delete,
// filter, and paginate tasks.
export default function Dashboard({ user }) {

  // State to store list of tasks
  const [tasks, setTasks] = useState([]);

  // State to store selected task filter (all, not_started, in_progress, completed)
  const [filter, setFilter] = useState("all");

  // Loading state while fetching tasks
  const [loading, setLoading] = useState(false);

  // Current pagination page
  const [page, setPage] = useState(1);

  // Load tasks from the backend with pagination and filter
  const loadTasks = useCallback(async () => {

    // Show loading indicator
    setLoading(true);

    try {

      // Fetch tasks using service function
      const data = await getTasks(filter, page);

      // Update state with fetched tasks
      setTasks(data || []);

    } catch (err) {

      // Log error if request fails
      console.error("Failed to load tasks");

    } finally {

      // Stop loading indicator
      setLoading(false);

    }

  }, [filter, page]);


  // Automatically load tasks when component mounts
  // or when filter/page changes
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);


  // Handle creating a new task
  const handleCreate = useCallback(async (payload) => {

    // Send task data to backend
    const task = await createTask(payload);

    // Add newly created task to the top of the list
    setTasks((prev) => [task, ...prev]);

  }, []);


  // Handle updating an existing task
  const handleUpdate = useCallback(async (id, payload) => {

    // Send update request to backend
    const updated = await updateTask(id, payload);

    // Replace the updated task in the list
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? updated : t
      )
    );

  }, []);


  // Handle deleting a task
  const handleDelete = useCallback(async (id) => {

    // Call backend to delete task
    await deleteTask(id);

    // Remove the task from state
    setTasks((prev) =>
      prev.filter((t) => t.id !== id)
    );

  }, []);


  // Handle changing task filter
  const handleFilterChange = useCallback((e) => {

    // Reset page to first page when filter changes
    setPage(1);

    // Update filter state
    setFilter(e.target.value);

  }, []);


  // Go to next page of tasks
  const handleNextPage = useCallback(() => {

    setPage((prev) => prev + 1);

  }, []);


  // Go to previous page of tasks
  const handlePrevPage = useCallback(() => {

    // Prevent page number from going below 1
    setPage((prev) => Math.max(prev - 1, 1));

  }, []);


  return (

    <div>

      {/* Task creation form */}
      <TaskForm onSubmit={handleCreate} />

      {/* Filter dropdown to filter tasks by progress */}
      <select
        value={filter}
        onChange={handleFilterChange}
      >

        <option value="all">All</option>

        <option value="not_started">
          Not started
        </option>

        <option value="in_progress">
          In progress
        </option>

        <option value="completed">
          Completed
        </option>

      </select>

      {/* Show loading message while fetching tasks */}
      {loading && <p>Loading tasks...</p>}

      {/* Render each task using TaskCard component */}
      {tasks.map((task) => (

        <TaskCard
          key={task.id}
          task={task}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />

      ))}

      {/* Pagination controls */}

      <div style={{ marginTop: 20 }}>

        {/* Previous page button */}
        <button onClick={handlePrevPage}>
          Prev
        </button>

        {/* Current page display */}
        <span style={{ margin: "0 10px" }}>
          Page {page}
        </span>

        {/* Next page button */}
        <button onClick={handleNextPage}>
          Next
        </button>

      </div>

    </div>

  );
}