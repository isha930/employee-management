import { useState } from "react";

const EmployeeCard = ({ employee, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState({ ...employee });

  const handleChange = (e) => {
    setEditedEmployee({ ...editedEmployee, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    onUpdate(editedEmployee);
    setIsEditing(false);
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl border border-gray-300 rounded-lg flex flex-col items-center p-4 relative">
      {/* Header */}
      <div className="w-full bg-blue-600 text-white p-2 rounded-t-lg text-center font-semibold">
        {employee.department ? employee.department : "Company Name"}
      </div>

      {/* Profile Image */}
      <figure className="mt-4">
        <img
          src={
            employee.gender === "female"
              ? "/woman.png"
              : "/businessman.png"
          }
          alt={employee.name}
          className="rounded-full w-24 h-24 object-cover border-4 border-gray-300"
        />
      </figure>

      {/* Employee Details */}
      <div className="card-body text-center">
        <h2 className="card-title text-lg font-semibold">{employee.name}</h2>
        <p className="text-gray-600 font-medium">{employee.role}</p>
        <p className="text-gray-500 text-sm">📧 {employee.email || "No Email Provided"}</p>
        <p className="text-gray-500 text-sm">🏢 {employee.department || "No Department"}</p>
        <p className="text-gray-500 text-sm">📍 {employee.address || "No Address"}</p>
        <p className="text-gray-500 text-sm">📞 {employee.contact || "No Contact Info"}</p>
        <p className="text-gray-500 text-sm">🧑 {employee.gender || "Not Specified"}</p>
      </div>

      {/* Buttons */}
      <div className="w-full bg-gray-200 flex justify-around p-2 rounded-b-lg">
        <button onClick={() => setIsEditing(true)} className="btn btn-primary btn-sm">
          Edit
        </button>
        <button onClick={() => onDelete(employee.id)} className="btn btn-error btn-sm">
          Delete
        </button>
      </div>

      {/* Edit Popup (Fixed & Centered) */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full relative shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>

            <input
              type="text"
              name="name"
              value={editedEmployee.name}
              onChange={handleChange}
              className="input input-bordered w-full mb-2"
              placeholder="Name"
              required
            />
            <input
              type="email"
              name="email"
              value={editedEmployee.email}
              onChange={handleChange}
              className="input input-bordered w-full mb-2"
              placeholder="Email"
              required
            />
            <input
              type="text"
              name="role"
              value={editedEmployee.role}
              onChange={handleChange}
              className="input input-bordered w-full mb-2"
              placeholder="Role"
              required
            />
            <input
              type="text"
              name="department"
              value={editedEmployee.department}
              onChange={handleChange}
              className="input input-bordered w-full mb-2"
              placeholder="Department"
            />
            <input
              type="text"
              name="address"
              value={editedEmployee.address}
              onChange={handleChange}
              className="input input-bordered w-full mb-2"
              placeholder="Address"
            />
            <input
              type="text"
              name="contact"
              value={editedEmployee.contact}
              onChange={handleChange}
              className="input input-bordered w-full mb-2"
              placeholder="Phone Number"
            />

            <select
              name="gender"
              value={editedEmployee.gender}
              onChange={handleChange}
              className="input input-bordered w-full mb-2"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <button onClick={handleUpdate} className="btn btn-success">
                Save
              </button>
              <button onClick={() => setIsEditing(false)} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeCard;
