import { motion } from "framer-motion";

interface Task {
  key: string;
  id: string;
  title: string;
  description: string;
  completed: boolean;
  toggleComplete: (id: string, completed: boolean, title:string) => void;
  handleEdit: (task: Task) => void;
  deleteTask: (id: string) => void;
  expandedTask: string | null;
  setExpandedTask: (id: string | null) => void;
}

const TaskCard: React.FC<Task> = ({
  key,
  id,
  title,
  description,
  completed,
  toggleComplete,
  handleEdit,
  deleteTask,
  expandedTask,
  setExpandedTask,
}) => {
  return (
    <motion.li
      key={key}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className={`p-4 md:p-5 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center ${
        completed ? "opacity-50 line-through bg-green-600" : "bg-gray-800"
      } overflow-hidden break-words`}
    >
      <div className="flex-1 mb-2 sm:mb-0">
        <h2 className="text-lg sm:text-xl font-semibold line-clamp-2">{title}</h2>
        <p
          className={`text-gray-300 text-sm sm:text-base ${
            expandedTask === id ? "" : "line-clamp-2"
          }`}
        >
          {description}
        </p>
        {description.length > 100 && (
          <button
            className="text-blue-400 text-xs mt-1 underline"
            onClick={() => setExpandedTask(expandedTask === id ? null : id)}
          >
            {expandedTask === id ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => toggleComplete(id, !completed, title)}
          className={`px-3 py-1 rounded text-white text-sm ${
            completed ? "bg-gray-500" : "bg-green-600 hover:bg-green-500"
          }`}
        >
          {completed ? "Undo" : "Done"}
        </button>
        <button
          onClick={() => handleEdit({
            key, id, title, description, completed,
            toggleComplete,
            handleEdit,
            deleteTask,
            expandedTask: null,
            setExpandedTask
          })}
          className="px-3 py-1 bg-yellow-600 hover:bg-yellow-500 rounded text-white text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => deleteTask(id)}
          className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-white text-sm"
        >
          Delete
        </button>
      </div>
    </motion.li>
  );
};

export default TaskCard;
