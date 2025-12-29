export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task)}
      />

      <span
        className={
          task.completed ? "line-through text-gray-400" : "text-gray-700"
        }
      >
        {task.title}
      </span>

      {task.important && <span className="ml-auto text-red-500">★</span>}

      <button
        onClick={() => onDelete(task._id)}
        className="ml-2 text-red-500 hover:text-red-700"
      >
        ✕
      </button>
    </li>
  );
}
