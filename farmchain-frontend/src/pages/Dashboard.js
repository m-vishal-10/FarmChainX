import React, { useState } from 'react';
import { 
  Sun, Moon, LogOut, User, Bell, Settings, Home, Package, 
  TrendingUp, Users, Truck, ShoppingBag, AlertTriangle,
  Activity, BarChart3, ChevronRight, CheckCircle, Clock,
  MapPin, Leaf, Eye, ArrowRight
} from 'lucide-react';

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [userRole] = useState('Admin');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const stats = [
    { title: 'Total Users', value: '500', change: '+12%', icon: Users, color: 'blue' },
    { title: 'Total Products', value: '150', change: '+8%', icon: Package, color: 'green' },
    { title: 'Active Shipments', value: '25', change: '+5%', icon: Truck, color: 'purple' },
    { title: 'Alerts Detected', value: '3', change: '-2%', icon: AlertTriangle, color: 'red' }
  ];

  const recentActivities = [
    { id: 1, type: 'upload', user: 'Farmer John', action: 'uploaded Organic Tomatoes', time: '2 min ago', icon: Package, color: 'green' },
    { id: 2, type: 'shipment', user: 'Distributor ABC', action: 'started shipment #SH-1024', time: '15 min ago', icon: Truck, color: 'blue' },
    { id: 3, type: 'delivery', user: 'Retailer XYZ', action: 'received Basmati Rice', time: '1 hour ago', icon: ShoppingBag, color: 'purple' },
    { id: 4, type: 'alert', user: 'System', action: 'detected temperature anomaly', time: '2 hours ago', icon: AlertTriangle, color: 'red' },
    { id: 5, type: 'user', user: 'New Farmer', action: 'registered to the platform', time: '3 hours ago', icon: Users, color: 'green' }
  ];

  const supplyChainSteps = [
    { id: 1, name: 'Farmer', status: 'completed', icon: Leaf, count: 45 },
    { id: 2, name: 'Distributor', status: 'active', icon: Truck, count: 12 },
    { id: 3, name: 'Retailer', status: 'pending', icon: ShoppingBag, count: 8 },
    { id: 4, name: 'Consumer', status: 'pending', icon: Users, count: 0 }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500 text-blue-600 dark:text-blue-400',
      green: 'bg-green-500 text-green-600 dark:text-green-400',
      purple: 'bg-purple-500 text-purple-600 dark:text-purple-400',
      red: 'bg-red-500 text-red-600 dark:text-red-400'
    };
    return colors[color] || colors.blue;
  };

  const navigationItems = [
    { name: 'Overview', icon: Home, active: true },
    { name: 'Product Management', icon: Package, active: false },
    { name: 'Supply Chain Tracking', icon: Activity, active: false },
    { name: 'Analytics & AI Insights', icon: BarChart3, active: false },
    { name: 'Alerts & Notifications', icon: Bell, active: false },
    { name: 'Settings', icon: Settings, active: false }
  ];

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col`}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              {sidebarOpen && (
                <div>
                  <h2 className="font-bold text-gray-900 dark:text-white">Farm-to-Fork</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Traceability System</p>
                </div>
              )}
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition ${
                  item.active
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-full flex items-center justify-center px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              <ChevronRight className={`h-5 w-5 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Farm-to-Fork Traceability Dashboard</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Logged in as <span className="font-semibold text-green-600 dark:text-green-400">{userRole}</span></p>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                    <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                  </button>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                  >
                    {darkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-700" />}
                  </button>
                  <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                    <User className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Main Dashboard Content */}
          <main className="flex-1 overflow-y-auto p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                const colorClasses = getColorClasses(stat.color);
                return (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-xl transition transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-opacity-10 ${colorClasses.split(' ')[0]}`}>
                        <IconComponent className={`h-6 w-6 ${colorClasses.split(' ').slice(1).join(' ')}`} />
                      </div>
                      <span className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                  </div>
                );
              })}
            </div>

            {/* Supply Chain Flow Visualization */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Supply Chain Flow</h2>
              <div className="flex items-center justify-between">
                {supplyChainSteps.map((step, index) => (
                  <React.Fragment key={step.id}>
                    <div className="flex flex-col items-center flex-1">
                      <div className={`relative p-4 rounded-full ${
                        step.status === 'completed' ? 'bg-green-100 dark:bg-green-900/20' :
                        step.status === 'active' ? 'bg-blue-100 dark:bg-blue-900/20' :
                        'bg-gray-100 dark:bg-gray-700'
                      }`}>
                        <step.icon className={`h-8 w-8 ${
                          step.status === 'completed' ? 'text-green-600 dark:text-green-400' :
                          step.status === 'active' ? 'text-blue-600 dark:text-blue-400' :
                          'text-gray-400'
                        }`} />
                        {step.status === 'completed' && (
                          <CheckCircle className="absolute -top-1 -right-1 h-5 w-5 text-green-600 bg-white dark:bg-gray-800 rounded-full" />
                        )}
                        {step.status === 'active' && (
                          <Clock className="absolute -top-1 -right-1 h-5 w-5 text-blue-600 bg-white dark:bg-gray-800 rounded-full" />
                        )}
                      </div>
                      <p className="mt-3 font-semibold text-gray-900 dark:text-white">{step.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{step.count} items</p>
                    </div>
                    {index < supplyChainSteps.length - 1 && (
                      <ArrowRight className="h-6 w-6 text-gray-400 mx-4 flex-shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Activity */}
              <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
                  <button className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {recentActivities.map((activity) => {
                    const IconComponent = activity.icon;
                    const colorClasses = getColorClasses(activity.color);
                    return (
                      <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                        <div className={`p-2 rounded-lg bg-opacity-10 ${colorClasses.split(' ')[0]}`}>
                          <IconComponent className={`h-5 w-5 ${colorClasses.split(' ').slice(1).join(' ')}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 dark:text-white">
                            <span className="font-semibold">{activity.user}</span> {activity.action}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Analytics & Insights */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl shadow-md p-6 text-white">
                  <div className="flex items-center space-x-3 mb-4">
                    <TrendingUp className="h-6 w-6" />
                    <h3 className="text-lg font-bold">Product Growth</h3>
                  </div>
                  <p className="text-3xl font-bold mb-2">+24%</p>
                  <p className="text-sm text-green-100">Compared to last month</p>
                  <div className="mt-4 bg-white/20 rounded-lg p-3">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>This Month</span>
                      <span className="font-semibold">150</span>
                    </div>
                    <div className="bg-white/30 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <AlertTriangle className="h-6 w-6 text-yellow-600" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Anomaly Detection</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <span className="text-sm text-gray-900 dark:text-white font-medium">Temperature Alert</span>
                      <span className="text-xs text-red-600 dark:text-red-400 font-semibold">HIGH</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <span className="text-sm text-gray-900 dark:text-white font-medium">Delayed Shipment</span>
                      <span className="text-xs text-yellow-600 dark:text-yellow-400 font-semibold">MEDIUM</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <span className="text-sm text-gray-900 dark:text-white font-medium">Quality Check Due</span>
                      <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">LOW</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">AI Score Overview</h3>
                  </div>
                  <div className="text-center">
                    <div className="relative inline-flex items-center justify-center w-32 h-32">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" className="text-gray-200 dark:text-gray-700" />
                        <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" strokeDasharray="351.86" strokeDashoffset="70.37" className="text-purple-600" strokeLinecap="round" />
                      </svg>
                      <span className="absolute text-3xl font-bold text-gray-900 dark:text-white">88%</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">Overall System Health</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;