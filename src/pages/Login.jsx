import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // ✅ Save token
        toast.success("Login successful!");
        navigate("/employees"); // ✅ Redirect to employee list
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" value={credentials.email} onChange={handleChange} className="input input-bordered w-full mb-2" placeholder="Email" required />
        <input type="password" name="password" value={credentials.password} onChange={handleChange} className="input input-bordered w-full mb-2" placeholder="Password" required />
        <button type="submit" className="btn btn-primary w-full">Login</button>
      </form>
    </div>
  );
};

export default Login;
