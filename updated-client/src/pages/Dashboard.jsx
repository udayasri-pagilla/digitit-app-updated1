// import React, { useEffect, useState } from "react";
// import TaskForm from "../forms/TaskForm";
// import TaskCard from "../components/TaskCard";
// import {
//   getTasks,
//   createTask,
//   updateTask,
//   deleteTask
// } from "../services/taskService";

// export default function Dashboard({ user }) {

//   const [tasks, setTasks] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const [loading, setLoading] = useState(false);

//   async function loadTasks() {

//     setLoading(true);

//     try {

//       const data = await getTasks(filter);
//       setTasks(data || []);

//     } finally {

//       setLoading(false);

//     }

//   }

//   useEffect(() => {
//     loadTasks();
//   }, [filter]);

//   async function handleCreate(payload) {

//     const task = await createTask(payload);
//     setTasks((prev) => [task, ...prev]);

//   }

//   async function handleUpdate(id, payload) {

//     const updated = await updateTask(id, payload);

//     setTasks((prev) =>
//       prev.map((t) =>
//         t.id === id ? updated : t
//       )
//     );

//   }

//   async function handleDelete(id) {

//     await deleteTask(id);

//     setTasks((prev) =>
//       prev.filter((t) => t.id !== id)
//     );

//   }

//   return (

//     <div>

//       <TaskForm onSubmit={handleCreate} />

//       <select
//         value={filter}
//         onChange={(e) =>
//           setFilter(e.target.value)
//         }
//       >

//         <option value="all">All</option>
//         <option value="not_started">
//           Not started
//         </option>
//         <option value="in_progress">
//           In progress
//         </option>
//         <option value="completed">
//           Completed
//         </option>

//       </select>

//       {loading && <p>Loading tasks...</p>}

//       {tasks.map((task) => (

//         <TaskCard
//           key={task.id}
//           task={task}
//           onUpdate={handleUpdate}
//           onDelete={handleDelete}
//         />

//       ))}

//     </div>

//   );
// }
import React, { useEffect, useState, useCallback } from "react";
import TaskForm from "../forms/TaskForm";
import TaskCard from "../components/TaskCard";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from "../services/taskService";

export default function Dashboard({ user }) {

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  // Load tasks with pagination
  const loadTasks = useCallback(async () => {

    setLoading(true);

    try {

      const data = await getTasks(filter, page);
      setTasks(data || []);

    } catch (err) {

      console.error("Failed to load tasks");

    } finally {

      setLoading(false);

    }

  }, [filter, page]);



  useEffect(() => {
    loadTasks();
  }, [loadTasks]);



  const handleCreate = useCallback(async (payload) => {

    const task = await createTask(payload);

    setTasks((prev) => [task, ...prev]);

  }, []);



  const handleUpdate = useCallback(async (id, payload) => {

    const updated = await updateTask(id, payload);

    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? updated : t
      )
    );

  }, []);



  const handleDelete = useCallback(async (id) => {

    await deleteTask(id);

    setTasks((prev) =>
      prev.filter((t) => t.id !== id)
    );

  }, []);



  const handleFilterChange = useCallback((e) => {

    setPage(1);
    setFilter(e.target.value);

  }, []);



  const handleNextPage = useCallback(() => {

    setPage((prev) => prev + 1);

  }, []);



  const handlePrevPage = useCallback(() => {

    setPage((prev) => Math.max(prev - 1, 1));

  }, []);



  return (

    <div>

      <TaskForm onSubmit={handleCreate} />

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

      {loading && <p>Loading tasks...</p>}

      {tasks.map((task) => (

        <TaskCard
          key={task.id}
          task={task}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />

      ))}

      {/* Pagination */}

      <div style={{ marginTop: 20 }}>

        <button onClick={handlePrevPage}>
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page}
        </span>

        <button onClick={handleNextPage}>
          Next
        </button>

      </div>

    </div>

  );
}