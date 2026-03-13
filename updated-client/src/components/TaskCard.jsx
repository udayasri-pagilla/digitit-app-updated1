import React from "react";
import { formatDate } from "../utils/formatDate";

// TaskCard component
// Displays a single task with its details and actions
// Props:
// task -> task object containing title, description, dueDate, progress
// onDelete -> function to delete the task
// onUpdate -> function to update task details
function TaskCard({ task, onDelete, onUpdate }) {

  return (

    // Main container for a single task card
    <div className="task-card">

      {/* Display task title */}
      <h3>{task.title}</h3>

      {/* Show task description, or fallback text if empty */}
      <p>{task.description || "No description"}</p>

      {/* Show formatted due date using utility function */}
      <p>
        <b>Due:</b> {formatDate(task.dueDate)}
      </p>

      {/* Dropdown to update task progress */}
      <select
        value={task.progress}
        onChange={(e) =>
          // Call parent update function when progress changes
          onUpdate(task.id, {
            progress: e.target.value
          })
        }
      >

        {/* Task progress options */}
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

      {/* Action buttons for editing and deleting task */}
      <div className="task-actions">

        {/* Edit button to update task title */}
        <button
          onClick={() => {
            // Prompt user for a new title
            const newTitle = prompt(
              "Edit task title",
              task.title
            );

            // If user enters a title, update the task
            if (newTitle)
              onUpdate(task.id, { title: newTitle });
          }}
        >
          Edit
        </button>

        {/* Delete button to remove the task */}
        <button
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>

      </div>

    </div>

  );
}

// React.memo prevents unnecessary re-rendering
// The component will re-render only if props change
export default React.memo(TaskCard);