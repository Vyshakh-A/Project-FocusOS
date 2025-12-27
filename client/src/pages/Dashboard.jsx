import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import TaskList from "../components/TaskList";
import TaskFilter from "../components/TaskFilter";
import TasksPage from "./TasksPage";

export default function Dashboard() {
  const { loadTodayTasks, tasks } = useTasks();
  const [filter, setFilter] = useState("all");
  const [activePage, setActivePage] = useState("dashboard");
  const [shutterOpen, setShutterOpen] = useState(false);

  // Trigger shutter animation on mount
  useEffect(() => {
    setTimeout(() => setShutterOpen(true), 800);
  }, []);

  useEffect(() => {
    loadTodayTasks();
  }, []);

  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.length - completed;
  return (
    <div className='h-screen overflow-hidden bg-gradient-to-r from-gray-100 to-gray-200 flex'>
      {/* NAV SECTION */}
      <aside className='w-64 bg-gradient-to-r from-gray-100 to-gray-200 border-r p-6 flex flex-col shadow-lg'>
        <div className='space-y-6'>
          <h1 className='text-2xl font-extrabold'>FocusOS</h1>
          <nav className='flex flex-col gap-3'>
            <button
              onClick={() => setActivePage("dashboard")}
              className={`text-left px-4 py-2 rounded-lg transition-colors duration-200 font-medium ${
                activePage === "dashboard"
                  ? "bg-indigo-100 text-gray-900"
                  : "text-gray-700 hover:bg-indigo-100"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActivePage("tasks")}
              className={`text-left px-4 py-2 rounded-lg transition-colors duration-200 font-medium ${
                activePage === "tasks"
                  ? "bg-indigo-100 text-gray-900"
                  : "text-gray-700 hover:bg-indigo-100"
              }`}
            >
              Tasks
            </button>
            <button
              onClick={() => setActivePage("analytics")}
              className={`text-left px-4 py-2 rounded-lg transition-colors duration-200 font-medium ${
                activePage === "analytics"
                  ? "bg-indigo-100 text-gray-900"
                  : "text-gray-700 hover:bg-indigo-100"
              }`}
            >
              My Journey
            </button>
          </nav>
        </div>
        <div className='mt-auto pt-6 border-t'>
          <div className='px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700'>
            Logged in as{" "}
            <span className='font-semibold text-indigo-600'>User</span>
          </div>
        </div>
      </aside>

      {/* MAIN AREA */}
      <main className='flex-1 p-4 space-y-4 flex flex-col overflow-hidden relative'>
        {/* Shutter Animation */}
        {/* Cross-Opening Doors with Gradient Colors */}
        <div className='absolute inset-0 z-50 pointer-events-none'>
          {/* LEFT DOOR */}
          <div
            className={`
      fixed top-0 left-0 h-full w-1/2 
      bg-gradient-to-tr from-blue-500 via-indigo-600 to-purple-700
      transform transition-all duration-[1500ms] ease-in-out
      origin-bottom-right
      ${
        shutterOpen
          ? "-translate-x-full -translate-y-full rotate-45"
          : "translate-x-0 translate-y-0 rotate-0"
      }
    `}
          ></div>

          {/* RIGHT DOOR */}
          <div
            className={`
      fixed top-0 right-0 h-full w-1/2 
      bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600
      transform transition-all duration-[1500ms] ease-in-out
      origin-bottom-left
      ${
        shutterOpen
          ? "translate-x-full -translate-y-full -rotate-45"
          : "translate-x-0 translate-y-0 rotate-0"
      }
    `}
          ></div>
        </div>

        {shutterOpen && (
          <>
            {/* FIXED / STICKY FOCUS TIMER */}
            {activePage === "dashboard" && (
              <>
                <div className='sticky top-0 z-20 bg-white border rounded-xl shadow-lg'>
                  <FocusTimer />
                </div>

                {/* STAT SECTION */}
                <section className='grid grid-cols-4 gap-6'>
                  <StatCard
                    title='Streak'
                    value='5 days'
                    color='from-pink-400 to-pink-600'
                  />
                  <StatCard
                    title="Today's Focus"
                    value='42 min'
                    color='from-green-400 to-green-600'
                  />
                  <StatCard
                    title='Completed'
                    value={completed}
                    color='from-blue-400 to-blue-600'
                  />
                  <StatCard
                    title='Pending'
                    value={pending}
                    color='from-yellow-400 to-yellow-600'
                  />
                </section>

                {/* CONTENT AREA */}
                <section className='grid grid-cols-3 gap-6 flex-1'>
                  <div className=' h-130 col-span-2 bg-white border rounded-xl p-4 shadow flex flex-col gap-3'>
                    <h2 className='text-sm text-gray-500'>
                      {dayjs().format("dddd, MMMM D")}
                    </h2>
                    <TaskFilter filter={filter} setFilter={setFilter} />
                    <div className='flex-1 overflow-auto mt-2'>
                      <TaskList filter={filter} />
                    </div>
                  </div>
                  <div className='flex flex-col gap-6'>
                    <JournalBox />
                    <TaskProgressCircle
                      completed={completed}
                      pending={pending}
                    />
                  </div>
                </section>
              </>
            )}

            {/* Add other pages here */}
            {activePage === "tasks" && <TasksPage />}

            {activePage === "analytics" && <div>Analytics Page</div>}
          </>
        )}
      </main>
    </div>
  );
}

function JournalBox() {
  const [note, setNote] = useState("");

  return (
    <div className='bg-white border border-gray-200 rounded-xl p-4 shadow-md'>
      <h3 className='text-gray-800 font-semibold mb-3'>Journals</h3>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="What's one win today?..."
        className='
          w-full h-24 resize-none rounded-lg p-3
          bg-gray-100 text-gray-800 placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-indigo-500
        '
      />

      <button
        className='
          mt-4 w-full bg-indigo-600 text-white
          font-medium py-2 rounded-lg
          hover:bg-indigo-700 transition cursor-pointer
        '
      >
        Save
      </button>
    </div>
  );
}

function TaskProgressCircle({ completed, pending }) {
  const total = completed + pending;
  const completedPercent = total ? (completed / total) * 100 : 0;
  const pendingPercent = 100 - completedPercent;

  const quoteList = ["Keep Going", "Stay Focused", "One Step"];
  const quote = quoteList[new Date().getDay() % quoteList.length];

  return (
    <div className='h-68 bg-white border border-gray-200 rounded-xl p-4 shadow-md flex flex-col items-center'>
      <h3 className='text-gray-800 font-semibold mb-2'>Today’s Progress</h3>

      {/* CIRCLE */}
      <div className='relative w-48 h-48'>
        {/* Circle SVG and center text */}
        <svg className='w-full h-full -rotate-90' viewBox='0 0 180 180'>
          {/* Background */}
          <circle
            cx='90'
            cy='90'
            r='78'
            stroke='#e5e7eb'
            strokeWidth='12'
            fill='none'
          />
          {/* Completed (GREEN – outer ring) */}
          <circle
            cx='90'
            cy='90'
            r='78'
            stroke='#22c55e'
            strokeWidth='12'
            fill='none'
            strokeDasharray={`${completedPercent * 4.9} 490`}
            strokeLinecap='round'
          />
          {/* Pending (RED – inner ring) */}
          <circle
            cx='90'
            cy='90'
            r='62'
            stroke='#ef4444'
            strokeWidth='12'
            fill='none'
            strokeDasharray={`${pendingPercent * 3.84} 384`}
            strokeDashoffset={-completedPercent * 4.9}
            strokeLinecap='round'
          />
        </svg>

        {/* CENTER TEXT */}
        <div className='absolute inset-0 flex flex-col items-center justify-center text-center'>
          <div className='text-sm text-gray-500'>Today</div>
          <div className='text-lg font-bold text-gray-800'>{quote}</div>
        </div>

        {/* LEGEND INSIDE THE CIRCLE DIV */}
        {/* LEGEND INSIDE THE CIRCLE DIV */}
        <div className='absolute left-1/2 transform -translate-x-1/2 flex gap-4 text-sm'>
          <div className='flex items-center gap-1'>
            <span className='w-3 h-3 bg-green-500 rounded-full'></span>
            Completed
          </div>
          <div className='flex items-center gap-1'>
            <span className='w-3 h-3 bg-red-500 rounded-full'></span>
            Pending
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div
      className={`rounded-xl p-4 text-white shadow bg-gradient-to-br ${color}`}
    >
      <div className='text-sm opacity-80'>{title}</div>
      <div className='text-xl font-bold mt-1'>{value}</div>
    </div>
  );
}

function FocusTimer() {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [confetti, setConfetti] = useState([]);

  // Timer increment
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  // Confetti animation (rectangles) stops after 10 seconds
  useEffect(() => {
    if (!completed) return;

    let stopConfetti = false;
    const stopTimeout = setTimeout(() => (stopConfetti = true), 10000);

    const interval = setInterval(() => {
      if (stopConfetti) return;
      const x = Math.random() * 100;
      const width = Math.random() * 8 + 8;
      const height = Math.random() * 4 + 4;
      const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
      const rotation = Math.random() * 360;
      const id = Date.now() + Math.random();

      setConfetti((prev) => [
        ...prev,
        { x, width, height, color, rotation, id },
      ]);
      setTimeout(() => {
        setConfetti((prev) => prev.filter((c) => c.id !== id));
      }, 2000);
    }, 100);

    return () => {
      clearInterval(interval);
      clearTimeout(stopTimeout);
    };
  }, [completed]);

  const handleCompleted = () => {
    if (!running) return;
    setRunning(false);
    setCompleted(true);
  };

  return (
    <div className='relative px-5 py-2 flex items-center justify-between'>
      {/* LEFT */}
      <div>
        <h2 className='text-base font-semibold text-gray-800'>Focus Session</h2>
        <p className='text-sm text-gray-500'>Stay focused. Finish strong.</p>
      </div>

      {/* TIMER */}
      <div className='text-3xl font-extrabold text-indigo-600'>
        {Math.floor(seconds / 60)
          .toString()
          .padStart(2, "0")}
        :{(seconds % 60).toString().padStart(2, "0")}
      </div>

      {/* BUTTONS */}
      <div className='flex gap-3'>
        {/* START */}
        <button
          onClick={() => {
            setRunning(true);
            setCompleted(false);
            setSeconds(0);
          }}
          disabled={running}
          className={`
      px-5 py-2 rounded-lg font-medium transition-all
      ${
        running
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-green-500 text-white hover:bg-green-600 cursor-pointer hover:scale-105"
      }
    `}
        >
          Start
        </button>

        {/* COMPLETE */}
        <button
          onClick={handleCompleted}
          disabled={!running || completed}
          className={`
      px-5 py-2 rounded-lg font-medium transition-all
      ${
        !running || completed
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-red-500 text-white hover:bg-red-600 cursor-pointer hover:scale-105"
      }
    `}
        >
          {completed ? "Completed" : "Complete"}
        </button>
      </div>

      {/* CONFETTI */}
      {confetti.map((c) => (
        <div
          key={c.id}
          style={{
            left: `${c.x}%`,
            width: `${c.width}px`,
            height: `${c.height}px`,
            backgroundColor: c.color,
            transform: `rotate(${c.rotation}deg)`,
            animation: "fallRect 2s linear forwards",
          }}
          className='absolute top-0 pointer-events-none'
        />
      ))}

      <style>{`
      @keyframes fallRect {
        0% { transform: translateY(0); opacity: 1; }
        100% { transform: translateY(300px); opacity: 0; }
      }
    `}</style>
    </div>
  );
}
