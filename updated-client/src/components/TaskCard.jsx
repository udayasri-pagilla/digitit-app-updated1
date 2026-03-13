// import React from "react";
// import { formatDate } from "../utils/formatDate";

// export default function TaskCard({
//   task,
//   onDelete,
//   onUpdate
// }) {

//   return (

//     <div className="task-card">

//       <h3>{task.title}</h3>

//       <p>{task.description || "No description"}</p>

//       <p>
//         <b>Due:</b> {formatDate(task.dueDate)}
//       </p>

//       <select
//         value={task.progress}
//         onChange={(e) =>
//           onUpdate(task.id, {
//             progress: e.target.value
//           })
//         }
//       >

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

//       <div className="task-actions">

//         <button
//           onClick={() => {
//             const newTitle = prompt(
//               "Edit task title",
//               task.title
//             );

//             if (newTitle)
//               onUpdate(task.id, { title: newTitle });
//           }}
//         >
//           Edit
//         </button>

//         <button
//           onClick={() => onDelete(task.id)}
//         >
//           Delete
//         </button>

//       </div>

//     </div>

//   );
// }
import React from "react";
import { formatDate } from "../utils/formatDate";

function TaskCard({ task, onDelete, onUpdate }) {

  return (

    <div className="task-card">

      <h3>{task.title}</h3>

      <p>{task.description || "No description"}</p>

      <p>
        <b>Due:</b> {formatDate(task.dueDate)}
      </p>

      <select
        value={task.progress}
        onChange={(e) =>
          onUpdate(task.id, {
            progress: e.target.value
          })
        }
      >

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

      <div className="task-actions">

        <button
          onClick={() => {
            const newTitle = prompt(
              "Edit task title",
              task.title
            );

            if (newTitle)
              onUpdate(task.id, { title: newTitle });
          }}
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>

      </div>

    </div>

  );
}

export default React.memo(TaskCard);