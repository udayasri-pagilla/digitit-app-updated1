

import React, { useEffect, useState } from "react";
import { request } from "../api";
import TaskForm from "../shared/TaskForm";
export default function Dashboard({ user }) {
  const token = localStorage.getItem("token");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  // load tasks from backend
  async function loadTasks() {
    setLoading(true);
    setError(null);

    try {
      const qs =
        filter === "all"
          ? ""
          : `?progress=${encodeURIComponent(filter)}`;

      const data = await request(`/tasks${qs}`, { token });

      // backend returns array of tasks
      setTasks(data || []);

    } catch (err) {
      console.error(err);
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, [filter]);



  // create task
  async function createTask(payload) {
    try {
      const task = await request("/tasks", {
        method: "POST",
        token,
        body: payload
      });

      setTasks((prev) => [task, ...prev]);

    } catch (err) {
      alert("Failed to create task");
      console.log("TOKEN FROM APP:", token);
    }
  }



  // update task
  async function updateTask(id, payload) {
    try {
      const updatedTask = await request(`/tasks/${id}`, {
        method: "PUT",
        token,
        body: payload
      });

      setTasks((prev) =>
        prev.map((t) => (t.id === id ? updatedTask : t))
      );

    } catch (err) {
      alert("Update failed");
    }
  }



  // delete task
  async function deleteTask(id) {
    if (!window.confirm("Delete this task?")) return;

    try {
      await request(`/tasks/${id}`, {
        method: "DELETE",
        token
      });

      setTasks((prev) => prev.filter((t) => t.id !== id));

    } catch (err) {
      alert("Delete failed");
    }
  }



  function formatDate(date) {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }



  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <div className="header-card">
        <h1>DigitIt Task Manager</h1>

        <p>
          Welcome <strong>{user.email}</strong> • {user.role}
        </p>
      </div>



      {/* CREATE TASK */}
      <div className="task-create-box">
        <TaskForm onSubmit={createTask} />
      </div>



      {/* FILTER */}
      <div className="filter-box">
        <label>Filter by progress</label>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="not_started">Not started</option>
          <option value="in_progress">In progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>



      {/* TASK LIST */}
      <div className="tasks-grid">

        {loading && <p>Loading tasks...</p>}

        {error && <p className="error">{error}</p>}

        {!loading && tasks.length === 0 && (
          <p>No tasks yet</p>
        )}



        {tasks.map((task) => (

          <div key={task.id} className="task-card">

            <h3>{task.title}</h3>

            <p>{task.description || "No description"}</p>

            <p>
              <b>Due:</b> {formatDate(task.dueDate)}
            </p>



            <select
              value={task.progress}
              onChange={(e) =>
                updateTask(task.id, {
                  progress: e.target.value
                })
              }
            >
              <option value="not_started">Not started</option>
              <option value="in_progress">In progress</option>
              <option value="completed">Completed</option>
            </select>



            <div className="task-actions">

              <button
                onClick={() => {
                  const newTitle = prompt(
                    "Edit task title",
                    task.title
                  );

                  if (newTitle)
                    updateTask(task.id, { title: newTitle });
                }}
              >
                Edit
              </button>

              <button
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}