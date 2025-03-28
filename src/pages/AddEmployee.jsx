import { useState } from "react";
import toast, { Toaster } from "react-hot-toast"; // Ensure Toaster is included

const AddEmployee = ({ onEmployeeAdded }) => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    address: "",
    contact: "",
    gender: "male",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!/^\S+@\S+\.\S+$/.test(employee.email)) {
      return toast.error("❌ Invalid email format!");
    }
    if (!/^\d{10}$/.test(employee.contact)) {
      return toast.error("❌ Contact number must be 10 digits!");
    }

    setLoading(true);

    try {
      const response = await fetch("https://employee-management-8r9s.onrender.com//employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      });

      const data = await response.json(); // Read response JSON before checking `response.ok`

      if (!response.ok) {
        throw new Error(data.message || "Failed to add employee");
      }

      toast.success(`🎉 ${data.message}`); // Ensure success message from backend is shown

      setEmployee({ name: "", email: "", role: "", department: "", address: "", contact: "", gender: "male" });

      if (onEmployeeAdded) {
        onEmployeeAdded();
      }
    } catch (error) {
      toast.error(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Toaster /> {/* Ensure toast notifications appear */}
      <h2 className="text-2xl font-bold text-center mb-4">Add Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" name="name" value={employee.name} onChange={handleChange} className="input input-bordered w-full" placeholder="Name" required />
        <input type="email" name="email" value={employee.email} onChange={handleChange} className="input input-bordered w-full" placeholder="Email" required />
        <input type="text" name="role" value={employee.role} onChange={handleChange} className="input input-bordered w-full" placeholder="Role" required />
        <input type="text" name="department" value={employee.department} onChange={handleChange} className="input input-bordered w-full" placeholder="Department" required />
        <input type="text" name="address" value={employee.address} onChange={handleChange} className="input input-bordered w-full" placeholder="Address" required />
        <input type="text" name="contact" value={employee.contact} onChange={handleChange} className="input input-bordered w-full" placeholder="Phone Number (10 digits)" required />
        
        <select name="gender" value={employee.gender} onChange={handleChange} className="select select-bordered w-full">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button type="submit" className={`btn btn-primary w-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`} disabled={loading}>
          {loading ? "Adding..." : "Add Employee"}
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
