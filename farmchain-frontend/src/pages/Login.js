import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../api';

const Login = ({ setUserRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginApi(email, password);

      // store token in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);

      setUserRole(data.role);

      navigate(`/${data.role.toLowerCase()}`);

    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          
          <label className="block text-gray-700">Email</label>
          <input type="email" value={email} 
                 onChange={(e) => setEmail(e.target.value)}
                 className="w-full p-2 border rounded mt-1" />

          <label className="block text-gray-700 mt-4">Password</label>
          <input type="password" value={password} 
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full p-2 border rounded mt-1" />

          <button type="submit"
                  className="w-full bg-green-600 mt-6 text-white p-2 rounded hover:bg-green-700">
            Login
          </button>
        </form>

        <p className="mt-4 text-center">
          Don't have an account? <a href="/register" className="text-blue-600">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
