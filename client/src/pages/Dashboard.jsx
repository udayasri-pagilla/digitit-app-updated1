

// import React, { useEffect, useState } from "react";
// import { request } from "../api";
// import TaskForm from "../shared/TaskForm";
// export default function Dashboard({ user }) {
//   const token = localStorage.getItem("token");
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState("all");

//   // load tasks from backend
//   async function loadTasks() {
//     setLoading(true);
//     setError(null);

//     try {
//       const qs =
//         filter === "all"
//           ? ""
//           : `?progress=${encodeURIComponent(filter)}`;

//       const data = await request(`/tasks${qs}`, { token });

//       // backend returns array of tasks
//       setTasks(data || []);

//     } catch (err) {
//       console.error(err);
//       setError("Failed to load tasks");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     loadTasks();
//   }, [filter]);



//   // create task
//   async function createTask(payload) {
//     try {
//       const task = await request("/tasks", {
//         method: "POST",
//         token,
//         body: payload
//       });

//       setTasks((prev) => [task, ...prev]);

//     } catch (err) {
//       alert("Failed to create task");
//       console.log("TOKEN FROM APP:", token);
//     }
//   }



//   // update task
//   async function updateTask(id, payload) {
//     try {
//       const updatedTask = await request(`/tasks/${id}`, {
//         method: "PUT",
//         token,
//         body: payload
//       });

//       setTasks((prev) =>
//         prev.map((t) => (t.id === id ? updatedTask : t))
//       );

//     } catch (err) {
//       alert("Update failed");
//     }
//   }



//   // delete task
//   async function deleteTask(id) {
//     if (!window.confirm("Delete this task?")) return;

//     try {
//       await request(`/tasks/${id}`, {
//         method: "DELETE",
//         token
//       });

//       setTasks((prev) => prev.filter((t) => t.id !== id));

//     } catch (err) {
//       alert("Delete failed");
//     }
//   }



//   function formatDate(date) {
//     if (!date) return "—";

//     return new Date(date).toLocaleDateString("en-IN", {
//       year: "numeric",
//       month: "short",
//       day: "numeric"
//     });
//   }



//   return (
//     <div className="dashboard-container">

//       {/* HEADER */}
//       <div className="header-card">
//         <h1>DigitIt Task Manager</h1>

//         <p>
//           Welcome <strong>{user.email}</strong> • {user.role}
//         </p>
//       </div>



//       {/* CREATE TASK */}
//       <div className="task-create-box">
//         <TaskForm onSubmit={createTask} />
//       </div>



//       {/* FILTER */}
//       <div className="filter-box">
//         <label>Filter by progress</label>

//         <select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//         >
//           <option value="all">All</option>
//           <option value="not_started">Not started</option>
//           <option value="in_progress">In progress</option>
//           <option value="completed">Completed</option>
//         </select>
//       </div>



//       {/* TASK LIST */}
//       <div className="tasks-grid">

//         {loading && <p>Loading tasks...</p>}

//         {error && <p className="error">{error}</p>}

//         {!loading && tasks.length === 0 && (
//           <p>No tasks yet</p>
//         )}



//         {tasks.map((task) => (

//           <div key={task.id} className="task-card">

//             <h3>{task.title}</h3>

//             <p>{task.description || "No description"}</p>

//             <p>
//               <b>Due:</b> {formatDate(task.dueDate)}
//             </p>



//             <select
//               value={task.progress}
//               onChange={(e) =>
//                 updateTask(task.id, {
//                   progress: e.target.value
//                 })
//               }
//             >
//               <option value="not_started">Not started</option>
//               <option value="in_progress">In progress</option>
//               <option value="completed">Completed</option>
//             </select>



//             <div className="task-actions">

//               <button
//                 onClick={() => {
//                   const newTitle = prompt(
//                     "Edit task title",
//                     task.title
//                   );

//                   if (newTitle)
//                     updateTask(task.id, { title: newTitle });
//                 }}
//               >
//                 Edit
//               </button>

//               <button
//                 onClick={() => deleteTask(task.id)}
//               >
//                 Delete
//               </button>

//             </div>

//           </div>

//         ))}

//       </div>

//     </div>
//   );
// }


import React, { useEffect, useState, useCallback } from "react";
import { request } from "../api";
import TaskForm from "../shared/TaskForm";

/* helper function moved outside component */
const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};

export default function Dashboard({ user }) {

  const token = localStorage.getItem("token");

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");



  /* load tasks */

  const loadTasks = useCallback(async () => {

    setLoading(true);
    setError(null);

    try {

      const qs =
        filter === "all"
          ? ""
          : `?progress=${encodeURIComponent(filter)}`;

      const data = await request(`/tasks${qs}`, { token });

      setTasks(data || []);

    } catch (err) {

      console.error(err);
      setError("Failed to load tasks");

    } finally {

      setLoading(false);

    }

  }, [filter, token]);



  useEffect(() => {
    loadTasks();
  }, [loadTasks]);



  /* create task */

  const createTask = async (payload) => {

    try {

      const task = await request("/tasks", {
        method: "POST",
        token,
        body: payload
      });

      setTasks((prev) => [task, ...prev]);

    } catch (err) {

      setError("Failed to create task");

    }

  };



  /* update task */

  const updateTask = async (id, payload) => {

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

      setError("Update failed");

    }

  };



  /* delete task */

  const deleteTask = async (id) => {

    if (!window.confirm("Delete this task?")) return;

    try {

      await request(`/tasks/${id}`, {
        method: "DELETE",
        token
      });

      setTasks((prev) => prev.filter((t) => t.id !== id));

    } catch (err) {

      setError("Delete failed");

    }

  };



  /* handlers */

  const handleProgressChange = (id, value) => {
    updateTask(id, { progress: value });
  };



  const startEditing = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
  };



  const saveEdit = (taskId) => {
    if (!editTitle.trim()) return;

    updateTask(taskId, { title: editTitle });
    setEditingId(null);
  };



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


            {/* TITLE / EDIT MODE */}

            {editingId === task.id ? (

              <div>

                <input
                  value={editTitle}
                  onChange={(e) =>
                    setEditTitle(e.target.value)
                  }
                />

                <button onClick={() => saveEdit(task.id)}>
                  Save
                </button>

              </div>

            ) : (

              <h3>{task.title}</h3>

            )}



            <p>{task.description || "No description"}</p>

            <p>
              <b>Due:</b> {formatDate(task.dueDate)}
            </p>



            {/* PROGRESS */}

            <select
              value={task.progress}
              onChange={(e) =>
                handleProgressChange(task.id, e.target.value)
              }
            >

              <option value="not_started">Not started</option>
              <option value="in_progress">In progress</option>
              <option value="completed">Completed</option>

            </select>



            {/* ACTIONS */}

            <div className="task-actions">

              <button onClick={() => startEditing(task)}>
                Edit
              </button>

              <button onClick={() => deleteTask(task.id)}>
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}