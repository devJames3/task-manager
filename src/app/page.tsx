"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TaskCard from "@/components/TaskCard";
import TaskModal from "@/components/TaskModal";



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
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  function fetchTasks() {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => {
        console.error(error)
        toast.error("Something went wrong");
      })
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create or Update Task
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editTaskId) {
      try{
        const response = await fetch(`/api/tasks/?id=${editTaskId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, description }),
        });

        const data = await response.json();
        

        if (response.ok) {
          toast.success("Task updated successfully!");
          fetchTasks();
          resetForm();
        }else{
          toast.error(data.error || "Something went wrong");
        }
      }catch(error) {
        console.error(error)
        toast.error("An unexpected error occurred");
      }
      
    } else {
      
      try{
        const newTask = { title, description, completed: false };

        const response = await fetch("/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTask),
        });

        const data = await response.json();


        if (response.ok) {
          toast.success("Task created successfully!");
          fetchTasks();
          resetForm();
        }else{
          toast.error(data.error || "Something went wrong");
        }

      }catch (error){
        console.error(error)
        toast.error("An unexpected error occurred");
      }
      
    }
  };

  const toggleComplete = async (id: string, completed: boolean, title: string) => {
    try{
      const response = await fetch(`/api/tasks/?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed, title }),
      });

      if (response.ok) {
        fetchTasks();
      }else{
        toast.error("Failed to update task status");
      }

    }catch (error) {
      toast.error("An error occurred while updating task status");
      console.error(error)
    } 
  };

  const deleteTask = async (id: string) => {
    try{
      const response = await fetch(`/api/tasks/?id=${id}`, { method: "DELETE" });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "success");
        fetchTasks();
      }else{
        toast.error(data.error || "Something went wrong");
      }
    }catch(error){
      toast.error("An error occurred while deleting task");
      console.error(error)
    }
    
  };


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
    <div className="container mx-auto p-6 min-h-screen bg-gray-900 text-white max-w-[850px]">
      <ToastContainer 
        position="top-right"
        autoClose={5000}      
        hideProgressBar={false}    
        newestOnTop={false}        
        closeOnClick={true}       
        rtl={false}               
        pauseOnFocusLoss={false}    
        draggable={true}            
        pauseOnHover={true}
      />
      <h1 className="text-3xl font-bold mb-6 text-center">Saral Task Manager</h1>

      {/* Add Task Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        className="md:sticky md:mb-6 fixed bottom-6 right-6 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-full text-white shadow-lg md:rounded md:px-4 md:py-2"
      >
        + Add Task
      </motion.button>

      {/* Task List with Animation */}
      <ul className="space-y-4">
        <AnimatePresence>
          {tasks.map((task) => (
            <TaskCard key={task.id} id={task.id} title={task.title} description={task.description} completed={task.completed} toggleComplete={toggleComplete} handleEdit={handleEdit} deleteTask={deleteTask} expandedTask={expandedTask} setExpandedTask={setExpandedTask}/>
          ))}
        </AnimatePresence>
      </ul>

      {/* Modal for Adding/Editing Task */}
      <AnimatePresence>
        <TaskModal isModalOpen={isModalOpen} resetForm={resetForm} handleSubmit={handleSubmit} title={title} setTitle={setTitle} description={description} setDescription={setDescription} editTaskId={editTaskId} />
      </AnimatePresence>
    </div>
  );
}
