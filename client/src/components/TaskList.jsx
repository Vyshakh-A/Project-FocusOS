import TaskItem from "./TaskItem";
import { useTasks } from "../context/TaskContext";

export default function TaskList({ filter, customTasks }) {
  const { tasks, toggleComplete, deleteTask } = useTasks();

  // If TasksPage passes filtered tasks, use them
  const sourceTasks = customTasks || tasks;

  if (!sourceTasks.length) {
    return (
      <div className="flex flex-col items-center justify-center mt-16  text-gray-400">
        <p className="text-sm">No tasks here yet</p>
        <p className="text-xs mt-1">Create one and start focusing ✨</p>
      </div>
    );
  }

  const filtered = sourceTasks
    .filter((t) => {
      if (!filter) return true;
      if (filter === "completed") return t.completed;
      if (filter === "incomplete") return !t.completed;
      return true;
    })

    .sort((a, b) => a.completed - b.completed);

  return (
    <ul className="space-y-3">
      {filtered.map((t) => (
        <TaskItem
          key={t._id}
          task={t}
          onToggle={toggleComplete}
          onDelete={deleteTask}
        />
      ))}
    </ul>
  );
}
