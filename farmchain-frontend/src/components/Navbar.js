import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const Navbar = ({ userRole, setUserRole }) => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogout = () => {
    setUserRole(null);
    navigate('/');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className="bg-green-600 dark:bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Farm-to-Fork</Link>
        <div className="flex items-center space-x-4">
          {userRole && (
            <>
              <span>Welcome, {userRole}</span>
              <button onClick={toggleDarkMode} className="p-2 rounded hover:bg-green-700 dark:hover:bg-gray-700">
                {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </button>
              <button onClick={() => navigate('/')} className="bg-red-500 hover:bg-red-700 px-3 py-1 rounded">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;