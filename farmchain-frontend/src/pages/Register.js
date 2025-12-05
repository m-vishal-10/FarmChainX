import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../api";
import { toast } from "react-toastify";

const Register = ({ setUserRole }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("FARMER");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("All fields are required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const data = await registerApi(name, email, password, role);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);

      setUserRole(data.role);
      toast.success("Registration successful!");

      navigate(`/${data.role.toLowerCase()}`);
    } catch (err) {
      toast.error("Registration failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <form onSubmit={handleRegister}>
          <label className="block text-gray-700">Name</label>
          <input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
          />

          <label className="block text-gray-700 mt-4">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
          />

          <label className="block text-gray-700 mt-4">Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
          />

          <label className="block text-gray-700 mt-4">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="FARMER">Farmer</option>
            <option value="DISTRIBUTOR">Distributor</option>
            <option value="RETAILER">Retailer</option>
            <option value="CONSUMER">Consumer</option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-600 mt-6 text-white p-2 rounded hover:bg-green-700"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?
          <a href="/login" className="text-blue-600 ml-1">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;

// old
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { registerApi } from '../api';

// const Register = ({ setUserRole }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('FARMER');
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       const data = await registerApi(name, email, password, role);

//       // store token
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("role", data.role);
//       localStorage.setItem("name", data.name);

//       setUserRole(data.role);
//       navigate(`/${data.role.toLowerCase()}`);

//     } catch (err) {
//       alert("Registration failed: " + err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
//         <form onSubmit={handleRegister}>

//           <label className="block text-gray-700">Name</label>
//           <input value={name} onChange={(e) => setName(e.target.value)}
//                  className="w-full p-2 border rounded mt-1" />

//           <label className="block text-gray-700 mt-4">Email</label>
//           <input type="email" value={email}
//                  onChange={(e) => setEmail(e.target.value)}
//                  className="w-full p-2 border rounded mt-1" />

//           <label className="block text-gray-700 mt-4">Password</label>
//           <input type="password" value={password}
//                  onChange={(e) => setPassword(e.target.value)}
//                  className="w-full p-2 border rounded mt-1" />

//           <label className="block text-gray-700 mt-4">Role</label>
//           <select value={role} onChange={(e) => setRole(e.target.value)}
//                   className="w-full p-2 border rounded mt-1">
//             <option value="FARMER">Farmer</option>
//             <option value="DISTRIBUTOR">Distributor</option>
//             <option value="RETAILER">Retailer</option>
//             <option value="CONSUMER">Consumer</option>
//             <option value="ADMIN">Admin</option>
//           </select>

//           <button type="submit"
//                   className="w-full bg-green-600 mt-6 text-white p-2 rounded hover:bg-green-700">
//             Register
//           </button>
//         </form>

//         <p className="mt-4 text-center">
//           Already have an account? <a href="/login" className="text-blue-600">Login</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;
