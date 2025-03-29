Employee Management System (Backend)

This is the backend for the Employee Management System. It is built using Node.js, Express, and JWT authentication, and provides APIs for managing employees and user authentication.

🚀 Features

User Signup & Login with JWT authentication.

Manage Employees: Add, update, delete, and fetch employee details.

CORS enabled to allow frontend communication.

In-memory storage for users and employees.

🛠 Tech Stack

Backend: Node.js, Express.js

Authentication: JSON Web Token (JWT)

Frontend (Expected): React.js, Tailwind CSS

Storage: LocalStorage (for frontend) & in-memory storage (for backend)

🔧 Setup & Installation

1️⃣ Clone the Repository

git clone https://github.com/isha930/employee-management.git
cd employee

2️⃣ Install Dependencies

npm install

3️⃣ Run the Server

npm start

The server will start at http://localhost:5000.

📌 API Endpoints

🔹 Authentication

POST /api/signup → Signup a new user.

POST /api/login → Login and get a JWT token.

🔹 Employee Management

GET /employees → Get all employees.

POST /employees → Add a new employee.

PUT /employees/:id → Update an employee.

DELETE /employees/:id → Delete an employee.

🛡️ Authentication

JWT token is generated on login and should be stored in LocalStorage on the frontend.

Include the token in headers (Authorization: Bearer <token>) for protected routes.

🚀 Frontend Integration

The frontend is expected to be built using React.js & Tailwind CSS.

API calls can be made using fetch or axios.

Example Login Request (Frontend)

const response = await fetch("https://your-backend-url.com/api/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "eve.holt@reqres.in", password: "cityslicka" })
});
const data = await response.json();
console.log(data);

📝 Notes

No Database Used: Currently using in-memory storage.

CORS Enabled: The backend allows frontend access.

Secure your SECRET_KEY: Replace the hardcoded JWT secret key with an environment variable.

📌 License

This project is open-source and available for modification and usage.

