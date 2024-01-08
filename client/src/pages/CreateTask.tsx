"use server";

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CreateTask: React.FC = () => {
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [deadLine, setDeadline] = useState('');
  const [workOfStatus, setWorkStatus] = useState('');
  const { userId } = useParams();

  const handleCreateTask = () => {
    const createTaskData = {
      taskName,
      description,
      deadLine,
      workOfStatus,
    };

    // Perform a POST request to create a new task
    fetch(`http://localhost:8080/api/user/${userId}/task/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createTaskData),
    })
      .then((response) => {
        if (response.ok) {
          navigate(`/user/${userId}/TaskList`);
        } else {
          throw new Error('Failed to create task');
        }
      })
      .catch((error) => {
        console.error('Error creating task:', error.message);
        navigate(`/*`);
      });
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-md">
      <h2 className="text-2xl mb-4">Create New Task</h2>
      <label className="block mb-2">
        Task Name:
        <input
          className="border w-full p-2"
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </label>
      <label className="block mb-2">
        Description:
        <textarea
          className="border w-full p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label className="block mb-2">
        Deadline:
        <input
          className="border w-full p-2"
          type="date"
          value={deadLine}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </label>
      <label className="block mb-2">
        Work Status:
        <select
          className="border w-full p-2"
          value={workOfStatus}
          onChange={(e) => setWorkStatus(e.target.value)}
        >
          <option value="not-started">Not Started</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </label>
      <button
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        onClick={handleCreateTask}
      >
        Create Task
      </button>
    </div>
  );
};

export default CreateTask;
