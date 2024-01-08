import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Auth from "./components/Auth";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import TaskList from "./pages/TaskList";
import CreateTask from "./pages/CreateTask";
import Task from "./pages/Task";


function App() {
  return (
    <div>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<NotFound />} />
            <Route path="/user/:userId/Home" element={<Home/>}/>
            <Route path="/user/:userId/TaskList" element={<TaskList />}/>
            <Route path="/user/:userId/CreateTask" element={<CreateTask/>}/>
            <Route path="/user/:userId/:taskId" element={<Task/>}/>
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
