import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = "123"; // Replace with a secure secret key

// Sample Employee Data (In-memory storage)
let employees = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Software Engineer",
    department: "Engineering",
    address: "123 Street, NY",
    contact: "9876543210",
    gender: "male",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Project Manager",
    department: "Management",
    address: "456 Avenue, CA",
    contact: "1234567890",
    gender: "female",
  },
];

// Sample User Data (Temporary storage)
let users = [
  { email: "eve.holt@reqres.in", password: "cityslicka" }, // Default user
];

// ✅ Signup Route
app.post("/api/signup", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ error: "User already exists." });
  }

  users.push({ email, password });
  res.json({ message: "Signup successful! You can now log in." });
});

// ✅ Login Route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  console.log("Received body:", req.body);
    res.json({ message: "Login route hit!" });

  const user = users.find((user) => user.email === email && user.password === password);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ message: "Login successful", token });
});

// ✅ Get all employees
app.get("/employees", (req, res) => {
  res.json(employees);
});

// ✅ Add a new employee
app.post("/employees", (req, res) => {
  const { name, email, role, department, address, contact, gender } = req.body;

  if (!name || !email || !role || !department || !address || !contact || !gender) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newEmployee = {
    id: employees.length ? employees[employees.length - 1].id + 1 : 1, // Ensure unique ID
    name,
    email,
    role,
    department,
    address,
    contact,
    gender,
  };

  employees.push(newEmployee);
  console.log("Employee added:", newEmployee);
  res.status(201).json({ message: "Employee added successfully!", employee: newEmployee });
});

// ✅ Update an employee
app.put("/employees/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, role, department, address, contact, gender } = req.body;
  let employee = employees.find((emp) => emp.id == id);

  if (!employee) return res.status(404).json({ error: "Employee not found" });

  employee.name = name || employee.name;
  employee.email = email || employee.email;
  employee.role = role || employee.role;
  employee.department = department || employee.department;
  employee.address = address || employee.address;
  employee.contact = contact || employee.contact;
  employee.gender = gender || employee.gender;

  console.log("Employee updated:", employee);
  res.json({ message: "Employee updated successfully", employee });
});

// ✅ Delete an employee
app.delete("/employees/:id", (req, res) => {
  const { id } = req.params;
  employees = employees.filter((emp) => emp.id != id);
  console.log(`Employee with ID ${id} deleted.`);
  res.json({ message: "Employee deleted successfully" });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
