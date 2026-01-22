import { createContext, useContext, useState } from "react";
import {
  fetchTasks,
  updateTask,
  createTask,
  deleteTask,
} from "../services/taskApi";
import dayjs from "dayjs";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ---------- LOAD TODAY TASKS ---------- */
  const loadTodayTasks = async () => {
    try {
      setLoading(true);
      const todayStart = dayjs().startOf("day");

      let allTasks = [];
      let page = 1;
      let hasNextPage = true;

      while (hasNextPage) {
        const res = await fetchTasks({ page, limit: 100 });

        const tasksData = res.data.tasks;
        allTasks = allTasks.concat(tasksData.tasks);

        hasNextPage = tasksData.hasNextPage;
        page++;
      }

      const todayTasks = allTasks.filter((t) =>
        dayjs(t.createdAt).isAfter(todayStart)
      );

      // important first
      todayTasks.sort((a, b) => b.important - a.important);

      setTasks(todayTasks);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- LOAD ALL TASKS ---------- */
  const loadAllTasks = async () => {
    try {
      setLoading(true);
      let allTasks = [];
      let page = 1;
      let hasNextPage = true;

      while (hasNextPage) {
        const res = await fetchTasks({ page, limit: 100 });

        const tasksData = res.data.tasks;
        allTasks = allTasks.concat(tasksData.tasks);

        hasNextPage = tasksData.hasNextPage;
        page++;
      }

      // Sort by important first, then by createdAt desc
      allTasks.sort(
        (a, b) =>
          b.important - a.important ||
          new Date(b.createdAt) - new Date(a.createdAt)
      );

      setTasks(allTasks);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- CREATE TASK ---------- */
  const createNewTask = async (taskData) => {
    try {
      const res = await createTask(taskData);

      // Optimistic add
      setTasks((prev) => [res.data.task, ...prev]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
    }
  };

  /* ---------- TOGGLE COMPLETE ---------- */
  const toggleComplete = async (task) => {
    const prev = [...tasks];

    setTasks((ts) =>
      ts.map((t) =>
        t._id === task._id ? { ...t, completed: !t.completed } : t
      )
    );

    try {
      await updateTask(task._id, { completed: !task.completed });
    } catch {
      setTasks(prev);
    }
  };

  /* ---------- DELETE TASK ---------- */
  const removeTask = async (taskId) => {
    const prev = [...tasks];
    setTasks((ts) => ts.filter((t) => t._id !== taskId));

    try {
      await deleteTask(taskId);
    } catch {
      setTasks(prev);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        loadTodayTasks,
        loadAllTasks,
        createTask: createNewTask,
        toggleComplete,
        deleteTask: removeTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
