import { useState } from "react";

const LABELS = {
  all: "All Tasks",
  incomplete: "Incomplete",
  completed: "Completed",
};

export default function TaskFilter({ filter, setFilter }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (value) => {
    setFilter(value);
    setOpen(false);
  };

  return (
    <div className='relative inline-block w-fit'>
      {/* Trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        className='flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800 transition'
      >
        {/* Selected label */}
        <span>{LABELS[filter]}</span>

        {/* Chevron */}
        <span
          className={`transform transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          ▾
        </span>
      </button>

      {/* Dropdown options */}
      {open && (
        <div className='absolute left-0 mt-2 bg-white border rounded-lg shadow-md w-36 z-10'>
          {Object.entries(LABELS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 hover:rounded-lg ${
                filter === key ? "font-semibold text-indigo-600" : ""
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
