import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Home: React.FC = () => {
  const { userId } = useParams();
  const [username, setUsername] = useState("Ranjeet");
  const [numberOfTasks, setNumberOfTasks] = useState(0);
  const navigate=useNavigate(); 
  
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}/`);
        if (response.ok) {
          const userDetails = await response.json();
          setUsername(userDetails.userName);
          setNumberOfTasks(userDetails.noOfTask);
        } else {
          throw new Error("Failed to fetch user details");
        }
      } catch (error: any) {
        console.error("Error fetching user details:", error.message);
      }
    };

    fetchUserDetails();
  }, [userId]);
  const handleShowAllTasks = () => {
    navigate(`/user/${userId}/TaskList`);
  };
  const handleCreateTask=()=>{
    navigate(`/user/${userId}/CreateTask`);
  }

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-md">
      <div className="flex items-center mb-4">
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content rounded-full w-24">
            <span className="text-3xl">{username.toLowerCase()}</span>
          </div>
        </div>
        <h2 className="text-2xl">{`Welcome to the Home Page, ${username}`}</h2>
      </div>
      <p className="mb-4">
        Add Your tasks to manage in the App and Update it.ThankYou
      </p>
      <div className="mb-4">
        <p className="mb-2">Number of Tasks: {numberOfTasks}</p>
        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mr-2" onClick={handleShowAllTasks}>
          Show All Tasks
        </button>
        <button className="bg-green-500 text-white p-2 rounded hover:bg-green-600" onClick={handleCreateTask}>
          Create New Task
        </button>
      </div>
    </div>
  );
};

export default Home;
