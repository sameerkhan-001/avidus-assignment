import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [tasks, setTasks] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const userInfo =
    JSON.parse(
      localStorage.getItem("userInfo")
    );

  const config = {
    headers: {
      Authorization:
        `Bearer ${userInfo.token}`,
    },
  };

  const fetchTasks = async () => {

    const res = await axios.get(
      "http://localhost:5000/api/tasks",
      config
    );

    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {

    await axios.post(
      "http://localhost:5000/api/tasks",
      {
        title,
        description,
      },
      config
    );

    setTitle("");
    setDescription("");

    fetchTasks();
  };

  const deleteTask = async (id) => {

    await axios.delete(
      `http://localhost:5000/api/tasks/${id}`,
      config
    );

    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        User Dashboard
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Create Task
        </h2>

        <input
          type="text"
          placeholder="Task Title"
          className="w-full border p-3 rounded mb-4"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Task Description"
          className="w-full border p-3 rounded mb-4"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <button
          onClick={createTask}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Create Task
        </button>

      </div>

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-4">
          My Tasks
        </h2>

        {
          tasks.map((task) => (

            <div
              key={task._id}
              className="border p-4 rounded mb-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">
                  {task.title}
                </h3>

                <p>
                  {task.description}
                </p>
              </div>

              <button
                onClick={() =>
                  deleteTask(task._id)
                }
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>

            </div>
          ))
        }

      </div>

    </div>
  );
}

export default Dashboard;