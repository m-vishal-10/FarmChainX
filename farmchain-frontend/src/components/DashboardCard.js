import React from 'react';

const DashboardCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        {Icon && <Icon className="w-8 h-8 text-green-600" />}
      </div>
    </div>
  );
};

export default DashboardCard;
