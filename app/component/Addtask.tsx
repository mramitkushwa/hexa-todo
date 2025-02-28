"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function TodoApp() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [newTask, setNewTask] = useState<string>("");
  const [menuIndex, setMenuIndex] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      if (editIndex !== null) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = newTask;
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        setTasks([...tasks, newTask]);
      }
      setNewTask("");
    }
  };

  const editTask = (index: number) => {
    setNewTask(tasks[index]);
    setEditIndex(index);
    setMenuIndex(null);
  };

  const confirmDelete = (index: number) => {
    setDeleteIndex(index);
    setShowConfirm(true);
    setMenuIndex(null);
  };

  const deleteTask = () => {
    if (deleteIndex !== null) {
      setTasks(tasks.filter((_, i) => i !== deleteIndex));
      setShowConfirm(false);
      setDeleteIndex(null);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      {/* Input Field */}
      <div className="flex w-full max-w-3xl h-16 space-x-2">
        <input
          type="text"
          placeholder="Add your todo’s"
          className="flex-1 p-4 rounded-lg placeholder-black text-base border border-gray-300 sm:min-w-96 min-h-12"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          onClick={addTask}
          className="px-4 py-3 bg-blue-900 text-white rounded-lg"
        >
          <Image src="/addtask.svg" alt="add task" width={91} height={22} />
        </button>
      </div>

      {/* Task List */}
      <div className="w-full max-w-3xl mt-6 space-y-4">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="flex h-14 items-center justify-between bg-white p-3 rounded-lg shadow-md"
          >
            <input type="checkbox" className="mr-3 size-6" />
            <p className="flex-1 text-black">{task}</p>

            {/* Three-dot menu */}
            <div className="relative">
              <button
                onClick={() => setMenuIndex(menuIndex === index ? null : index)}
                className="p-2"
              >
                ⋮
              </button>

              {menuIndex === index && (
                <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-lg">
                  <button
                    onClick={() => editTask(index)}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(index)}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-red-500"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Popup */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white h-56 w-1/3 p-6 rounded-2xl shadow-lg space-y-5">
            <div className="flex justify-between">
              <p className="text-xl font-semibold">Are you sure?</p>
              <button onClick={() => setShowConfirm(false)}>
                <Image src="/cross.svg" alt="cross" width={24} height={24} />
              </button>
            </div>
            <p className="text-base font-light">
              You want to delete the todo “Take time to polish your designs
              based on feedback, ensuring usability and aesthetic quality.”
            </p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={deleteTask}
                className="px-4 h-12 w-1/2 py-2 bg-slate-200 text-blue-950 font-bold rounded-lg"
              >
                Yes, Delete
              </button>

              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 h-12 w-1/2 bg-blue-900 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
