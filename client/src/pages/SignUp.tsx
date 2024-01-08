import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorBool,setErrorBool]=useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const handleSignUp = async () => {
    try {
        const response = await fetch(`http://localhost:8080/api/users/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: username,
            password: password,
          }),
        });

        if (response.ok) {
          setRedirectToLogin(true);
        } else {
          console.error(`Error during fetching: ${response.status}`);
          setErrorBool(true);
        }
      } catch (error) {
        // Handle network or unexpected errors
        console.error(`Error during signup: ${error}`);
        setErrorBool(true);
    }
  };

  if (redirectToLogin) {
    return <Navigate to="/Login" />;
  }

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-md">
      <h2 className="text-2xl mb-4">Sign Up</h2>
      <h3 className="text-xs">Take Unique UserName only*</h3>
      <label className="block mb-2">
        Username:
        <input
          className="border w-full p-2 text-neutral"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter User Name"
        />
      </label>
      {(errorBool&&
        <p className="text-red-500 mb-2">
          Username is already taken. Try Again.
        </p>
      )}
      <label className="block mb-2">
        Password:
        <input
          className="border w-full p-2 text-neutral"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </label>
      <button
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        onClick={handleSignUp}
      >
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
