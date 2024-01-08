'server'
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface User {
  userId: string;
  username: string;
  numberOfTasks: BigInteger;
}

interface Task {
  taskId: number;
  taskName: string;
  deadline: string;
  workOfStatus: string;
  description:string;
}

const TaskList: React.FC = () => {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(`http://localhost:8080/api/users/${userId}/`);
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUserDetails(userData);
        } else {
          throw new Error('Failed to fetch user details');
        }

        const tasksResponse = await fetch(`http://localhost:8080/api/user/${userId}/tasks/`); 
        if (tasksResponse.ok) {
          const userTasks = await tasksResponse.json();
          setTasks(userTasks);
        } else {
          throw new Error('Failed to fetch user tasks');
        }
      } catch (error:any) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleEditTask = (taskId: number) => {
    const taskToEdit = tasks.find((task) => task.taskId === taskId);
    setSelectedTask(taskToEdit || null);
    if(selectedTask){
      navigate(`/user/${userId}/${taskId}`);
    }
  };
  const handleDeleteTask = async (taskId: number) => {
    try {
      const deleteResponse = await fetch(`http://localhost:8080/api/user/${userId}/${taskId}/`, {
        method: 'DELETE',
      });

      if (deleteResponse.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
      } else {
        throw new Error('Failed to delete task');
      }
    } catch (error:any) {
      console.error('Error deleting task:', error.message);
    }
  };
  const handleMarkAsComplete = async (taskId: number) => {
    try {
      const markAsCompleteResponse = await fetch(`http://localhost:8080/api/user/${userId}/${taskId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workOfStatus: 'Complete',
          deadLine:"2000-01-01",
          taskName:"Completed"
        }),
      });

      if (markAsCompleteResponse.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
      } else {
        throw new Error('Failed to mark task as complete');
      }
    } catch (error:any) {
      console.error('Error marking task as complete:', error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {userDetails && (
        <>
          <h2 className="text-2xl mb-4">{`Task List for ${userDetails.username}`}</h2>
        </>
      )}
      <h2 className='text-xl'>All Your Tasks</h2>
      <table className="min-w-full bg-white border rounded">
        <tbody>
          {tasks.map((task) => (
            <tr key={task.taskId}>
              <td className="py-2 px-4 border-b">{task.taskId}</td>
              <td className="py-2 px-4 border-b">{task.taskName}</td>
              <td className="py-2 px-4 border-b">{task.deadline}</td>
              <td className="py-2 px-4 border-b">{task.workOfStatus}</td>
              <td className="py-2 px-4 border-b">
                <button className="text-blue-500 hover:underline" onClick={() => handleEditTask(task.taskId)}>Edit</button>
              </td>
              <td className="py-2 px-4 border-b">
                <button className="text-red-500 hover:underline" onClick={()=>handleDeleteTask(task.taskId)}>Delete</button>
              </td>
              <td className="py-2 px-4 border-b">
              {task.workOfStatus !== 'Complete' && (
                  <button
                    className="text-green-500 hover:underline"
                    onClick={() => handleMarkAsComplete(task.taskId)}
                  >
                    Mark as Complete
                  </button>
                )}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
