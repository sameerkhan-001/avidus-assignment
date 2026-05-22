import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {

  const [users, setUsers] =
    useState([]);

  const [tasks, setTasks] =
    useState([]);

  const [logs, setLogs] =
    useState([]);

  useEffect(() => {

    const fetchData = async () => {

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

      const usersData =
        await axios.get(
          "http://localhost:5000/api/admin/users",
          config
        );

      const tasksData =
        await axios.get(
          "http://localhost:5000/api/admin/tasks",
          config
        );

      const logsData =
        await axios.get(
          "http://localhost:5000/api/admin/logs",
          config
        );

      setUsers(usersData.data);
      setTasks(tasksData.data);
      setLogs(logsData.data);
    };

    fetchData();

  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow">
  <h2 className="text-xl font-bold">
    Total Users
  </h2>

  <p className="text-3xl mt-2">
    {users.length}
  </p>
</div>

<div className="bg-white p-6 rounded-xl shadow">
  <h2 className="text-xl font-bold">
    Total Tasks
  </h2>

  <p className="text-3xl mt-2">
    {tasks.length}
  </p>
</div>

<div className="bg-white p-6 rounded-xl shadow">
  <h2 className="text-xl font-bold">
    Activity Logs
  </h2>

  <p className="text-3xl mt-2">
    {logs.length}
  </p>
</div>

<div className="bg-white p-6 rounded-xl shadow">
  <h2 className="text-xl font-bold">
    Completed Tasks
  </h2>

  <p className="text-3xl mt-2">
    {
      tasks.filter(
        (task) => task.completed
      ).length
    }
  </p>
</div>

<div className="bg-white p-6 rounded-xl shadow">
  <h2 className="text-xl font-bold">
    Pending Tasks
  </h2>

  <p className="text-3xl mt-2">
    {
      tasks.filter(
        (task) => !task.completed
      ).length
    }
  </p>
</div>

      </div>

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-4">
          Recent Activity
        </h2>

        {
          logs.map((log) => (

            <div
              key={log._id}
              className="border-b py-3"
            >
              <p>
                <strong>
                  {log.user?.name}
                </strong>

                {" "}
                - {log.action}
              </p>
            </div>
          ))
        }

      </div>

    </div>
  );
}

export default AdminDashboard;