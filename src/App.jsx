import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EmployeeList from "./pages/EmployeeList";
import AddEmployee from "./pages/AddEmployee";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// ✅ Function to check authentication
const isAuthenticated = () => !!localStorage.getItem("token");

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/signup" replace />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<ProtectedRoute element={<EmployeeList />} />} />
          <Route path="/add" element={<ProtectedRoute element={<AddEmployee />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
