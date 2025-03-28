import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ Remove token
    navigate("/login"); // ✅ Redirect to login
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">Employee Portal</h1>
      <div>
        <Link to="/" className="mx-2 hover:text-gray-300">Home</Link>
        <Link to="/employees" className="mx-2 hover:text-gray-300">Employees</Link>
        <Link to="/add" className="mx-2 hover:text-gray-300">Add Employee</Link>
        <button onClick={handleLogout} className="ml-4 px-3 py-1 bg-red-500 hover:bg-red-600 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
