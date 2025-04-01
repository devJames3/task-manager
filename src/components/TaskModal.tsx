import { motion } from "framer-motion";

interface TaskModalProps {
  isModalOpen: boolean;
  resetForm: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  editTaskId: string | null;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isModalOpen,
  resetForm,
  handleSubmit,
  title,
  setTitle,
  description,
  setDescription,
  editTaskId,
}) => {
  return (
    <>
      {isModalOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md"
        >
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
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
    </>
  );
};

export default TaskModal;
