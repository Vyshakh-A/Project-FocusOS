import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useTasks } from "../context/TaskContext";
import TaskList from "../components/TaskList";

export default function TasksPage() {
  const { tasks, loadAllTasks, createTask } = useTasks();

  const [showCreate, setShowCreate] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadAllTasks();
  }, []);

  // Filters
  const today = dayjs().format("YYYY-MM-DD");

  const filteredTasks = tasks.filter((task) => {
    const taskDate = dayjs(task.createdAt).format("YYYY-MM-DD");

    if (filter === "today") return taskDate === today;
    if (filter === "important") return task.important;

    return true;
  });

  return (
    <div className="h-full flex flex-col gap-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">All Tasks</h2>

        <button
          onClick={() => setShowCreate(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          + Create Task
        </button>
      </div>

      {/* FILTER BAR */}

      {/* FILTER PILLS */}
      <div className="flex bg-gray-100 rounded-full p-1">
        <Pill
          label="All"
          active={filter === "all"}
          onClick={() => setFilter("all")}
        />
        <Pill
          label="Today"
          active={filter === "today"}
          onClick={() => setFilter("today")}
        />
        <Pill
          label="Important"
          active={filter === "important"}
          onClick={() => setFilter("important")}
        />
      </div>

      {/* TASK LIST */}
      <div className="flex-1 overflow-auto bg-white border rounded-xl shadow-lg p-4">
        <TaskList customTasks={filteredTasks} />
      </div>

      {/* CREATE TASK MODAL */}
      {showCreate && <CreateTaskModal onClose={() => setShowCreate(false)} />}
    </div>
  );
}

/* ---------- Small Components ---------- */
function Pill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-1.5 rounded-full text-sm font-medium transition-all
        ${
          active
            ? "bg-white shadow text-indigo-700 scale-105"
            : "text-gray-600 hover:text-gray-800"
        }
      `}
    >
      {label}
    </button>
  );
}

/* ---------- CREATE TASK MODAL ---------- */

function CreateTaskModal({ onClose }) {
  const { createTask } = useTasks();
  const [title, setTitle] = useState("");
  const [important, setImportant] = useState(false);

  const handleSubmit = () => {
    if (!title.trim()) return;

    createTask({
      title,
      important,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-5 w-96 shadow-lg">
        <h3 className="font-semibold text-lg mb-3">Create Task</h3>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title (required)"
          className="w-full border rounded-lg px-3 py-2 mb-3"
        />

        <label className="flex items-center gap-2 mb-4 text-sm">
          <input
            type="checkbox"
            checked={important}
            onChange={(e) => setImportant(e.target.checked)}
          />
          Mark as Important
        </label>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-600">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
