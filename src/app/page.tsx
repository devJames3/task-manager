"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState<string | null>(null); // Track if editing

  function fetchTasks() {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create or Update Task
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    if (editTaskId) {
      // Editing Existing Task
      const response = await fetch(`/api/tasks/?id=${editTaskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        fetchTasks();
        resetForm();
      }
    } else {
      // Adding New Task
      const newTask = { title, description, completed: false };

      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        fetchTasks();
        resetForm();
      }
    }
  };

  const toggleComplete = async (id: string, completed: boolean) => {
    const response = await fetch(`/api/tasks/?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });

    if (response.ok) {
      fetchTasks();
    }
  };

  const deleteTask = async (id: string) => {
    const response = await fetch(`/api/tasks/?id=${id}`, { method: "DELETE" });

    if (response.ok) {
      fetchTasks();
    }
  };

  // Open Edit Modal
  const handleEdit = (task: Task) => {
    setEditTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setIsModalOpen(true);
  };

  // Reset Form
  const resetForm = () => {
    setEditTaskId(null);
    setTitle("");
    setDescription("");
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Task Manager</h1>

      {/* Add Task Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        className="md:relative md:mb-6 fixed bottom-6 right-6 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded text-white shadow-lg md:rounded md:px-4 md:py-2"
        // className="mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white"
      >
        + Add Task
      </motion.button>

      {/* Task List with Animation */}
      <ul className="space-y-4">
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.li
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className={`p-5 rounded-lg shadow-md flex justify-between items-center ${
                task.completed ? "opacity-50 line-through bg-green-600" : "bg-gray-800"
              }`}
            >
              <div>
                <h2 className="text-xl font-semibold">{task.title}</h2>
                <p className="text-gray-300">{task.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleComplete(task.id, !task.completed)}
                  className={`px-3 py-1 rounded text-white ${
                    task.completed ? "bg-gray-500" : "bg-green-600 hover:bg-green-500"
                  }`}
                >
                  {task.completed ? "Undo" : "Done"}
                </button>
                <button
                  onClick={() => handleEdit(task)}
                  className="px-3 py-1 bg-yellow-600 hover:bg-yellow-500 rounded text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-white"
                >
                  Delete
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Modal for Adding/Editing Task */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md"
          >
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">
                {editTaskId ? "Edit Task" : "Add New Task"}
              </h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Task Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 mb-3 bg-gray-700 text-white border border-gray-600 rounded"
                />
                <textarea
                  placeholder="Task Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 mb-3 bg-gray-700 text-white border border-gray-600 rounded"
                ></textarea>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded text-white"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white"
                  >
                    {editTaskId ? "Update Task" : "Save Task"}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
