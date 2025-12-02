import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, UserIcon, TruckIcon, ShoppingBagIcon, UserGroupIcon, CogIcon } from '@heroicons/react/24/solid';

const Sidebar = ({ userRole }) => {
  const menuItems = {
    Farmer: [
      { to: '/dashboard', label: 'Dashboard', icon: HomeIcon },
      { to: '/farmer', label: 'Product Upload', icon: UserIcon },
    ],
    Distributor: [
      { to: '/dashboard', label: 'Dashboard', icon: HomeIcon },
      { to: '/distributor', label: 'Track Batches', icon: TruckIcon },
    ],
    Retailer: [
      { to: '/dashboard', label: 'Dashboard', icon: HomeIcon },
      { to: '/retailer', label: 'Deliveries', icon: ShoppingBagIcon },
    ],
    Consumer: [
      { to: '/dashboard', label: 'Dashboard', icon: HomeIcon },
      { to: '/consumer', label: 'Traceability', icon: UserGroupIcon },
    ],
    Admin: [
      { to: '/dashboard', label: 'Dashboard', icon: HomeIcon },
      { to: '/admin', label: 'Admin Panel', icon: CogIcon },
    ],
  };

  const items = menuItems[userRole] || [];

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <h2 className="text-lg font-semibold mb-4">{userRole} Menu</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="mb-2">
            <Link to={item.to} className="flex items-center p-2 hover:bg-gray-700 rounded">
              <item.icon className="w-5 h-5 mr-2" />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
