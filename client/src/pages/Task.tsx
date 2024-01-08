import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface TaskItem {
  taskId: string | undefined;
  taskName: string;
  description: string;
  deadLine: string;
  workOfStatus: string;
}

const Task: React.FC = () => {
  const { userId, taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState<TaskItem>({
    taskId: taskId,
    taskName: "",
    description: "",
    deadLine: "",
    workOfStatus: "",
  });

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/user/${userId}/${taskId}/`);
        if (response.ok) {
          const taskDetails = await response.json();

          setTask({
            taskId: taskDetails.taskId,
            taskName: taskDetails.taskName,
            description: taskDetails.description,
            deadLine: taskDetails.deadLine,
            workOfStatus: taskDetails.workOfStatus,
          });
        } else {
          throw new Error('Failed to fetch task details');
        }
      } catch (error:any) {
        console.error('Error fetching task details:', error.message);
      }
    };

    fetchTaskDetails();
  }, [userId, taskId]);

  const handleUpdateTask = async () => {
    try {
      const updateResponse = await fetch(`http://localhost:8080/api/user/${userId}/${taskId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      if (updateResponse.ok) {
        navigate(`/user/${userId}/TaskList`);
      } else {
        throw new Error('Failed to update task details');
      }
    } catch (error:any) {
      console.error('Error updating task details:', error.message);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };


  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-md">
      <h2 className="text-2xl mb-4">Edit Task ID:{taskId}</h2>
      <label className="block mb-2">
        Task Name:
        <input
          className="border w-full p-2"
          type="text"
          name="name"
          value={task.taskName}
          onChange={handleInputChange}
        />
      </label>
      <label className="block mb-2">
        Description:
        <textarea
          className="border w-full p-2"
          name="description"
          value={task.description}
          onChange={handleInputChange}
        />
      </label>
      <label className="block mb-2">
        Deadline:
        <input
          className="border w-full p-2"
          type="date"
          name="deadline"
          value={task.deadLine}
          onChange={handleInputChange}
        />
      </label>
      <label className="block mb-2">
        Status:
        <select
          className="border w-full p-2"
          name="status"
          value={task.workOfStatus}
          onChange={handleInputChange}
        >
          <option value="not-started">Not Started</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </label>
      <button
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mr-2"
        onClick={handleUpdateTask}
      >
        Update Task
      </button>
    </div>
  );
};

export default Task;
