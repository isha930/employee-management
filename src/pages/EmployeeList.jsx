import { useEffect, useState } from "react";
import EmployeeCard from "../components/EmployeeCard";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 6;

  useEffect(() => {
    fetch("https://employee-management-8r9s.onrender.com//employees")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Employees:", data); // Debugging
        setEmployees(data);
      })
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);
  

  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const handleUpdate = (updatedEmployee) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
    );
  };


  // Pagination Logic
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>

      

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {currentEmployees.length > 0 ? (
  currentEmployees.map((emp, index) => (
    <EmployeeCard
      key={emp.id || index} // Use `emp.id` or fallback to `index`
      employee={emp}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
    />
  ))
) : (
  <p className="text-center text-gray-500">No employees found.</p>
)}

      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: Math.ceil(employees.length / employeesPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`btn btn-sm ${currentPage === i + 1 ? "btn-primary" : ""}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Toast Notification */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EmployeeList;
