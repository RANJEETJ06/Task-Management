import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [userId, SetUserId] = useState(-1);
  const navigate = useNavigate();

  const performLogin = async (
    userName: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/users/signing/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName, password }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        SetUserId(result.userId);
        return result.success;
      } else {
        console.error(`Sign-in failed: ${response.status}`);
        return false;
      }
    } catch (error) {
      console.error(`Error during sign-in: ${error}`);
      return false;
    }
  };

  useEffect(() => {
    if (userId !== -1) {
      navigate(`/user/${userId}/Home/`);
    }
  }, [userId, navigate]);

  const handleLogin = async () => {
    const isSuccessful = await performLogin(username, password);

    if (!isSuccessful) {
      setLoginError(true);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-md">
      <h2 className="text-2xl mb-4">Login</h2>
      <label className="block mb-2">
        Username:
        <input
          className="border w-full p-2"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label className="block mb-2">
        Password:
        <input
          className="border w-full p-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      {loginError && (
        <p className="text-red-500 mb-2">
          Login failed. Check your credentials.
        </p>
      )}
      <button
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
