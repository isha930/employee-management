import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Signup successful! Please login.");
        navigate("/login"); // ✅ Redirect to login
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" value={user.email} onChange={handleChange} className="input input-bordered w-full mb-2" placeholder="Email" required />
        <input type="password" name="password" value={user.password} onChange={handleChange} className="input input-bordered w-full mb-2" placeholder="Password" required />
        <button type="submit" className="btn btn-primary w-full">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
