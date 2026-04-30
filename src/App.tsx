import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import HomePage from "./HomePage";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element ={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App