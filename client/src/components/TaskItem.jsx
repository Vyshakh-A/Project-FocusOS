export default function TaskItem({ task, onToggle }) {
  return (
    <li className='flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg'>
      <input
        type='checkbox'
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

      {task.important && <span className='ml-auto text-red-500'>★</span>}
    </li>
  );
}
