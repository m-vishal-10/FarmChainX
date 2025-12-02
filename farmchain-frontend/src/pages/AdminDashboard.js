import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserGroupIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  CubeIcon,
  BellIcon,
  HomeIcon,
  UsersIcon,
  BeakerIcon,
  ShieldCheckIcon,
  ArrowRightOnRectangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  TruckIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  FunnelIcon
} from '@heroicons/react/24/solid';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [userRole] = useState('Admin');
  
  // Users State
  const [users, setUsers] = useState([
    { id: 1, username: 'john_farmer', role: 'Farmer', status: 'Active', email: 'john@farm.com', joinDate: '2024-01-15' },
    { id: 2, username: 'mary_dist', role: 'Distributor', status: 'Active', email: 'mary@dist.com', joinDate: '2024-02-20' },
    { id: 3, username: 'bob_retail', role: 'Retailer', status: 'Inactive', email: 'bob@retail.com', joinDate: '2024-03-10' },
    { id: 4, username: 'alice_consumer', role: 'Consumer', status: 'Active', email: 'alice@mail.com', joinDate: '2024-04-05' },
    { id: 5, username: 'tom_farmer', role: 'Farmer', status: 'Active', email: 'tom@farm.com', joinDate: '2024-05-12' },
  ]);
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('All');
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Products State
  const [products, setProducts] = useState([
    { id: 'FTF001', name: 'Organic Tomatoes', farmer: 'John Smith', location: 'Distribution Center', status: 'In Transit', quantity: '500 kg', date: '2024-10-25' },
    { id: 'FTF002', name: 'Fresh Lettuce', farmer: 'Mary Johnson', location: 'Retail Store', status: 'Delivered', quantity: '200 kg', date: '2024-10-27' },
    { id: 'FTF003', name: 'Free-range Eggs', farmer: 'Tom Brown', location: 'Farm', status: 'Harvested', quantity: '1000 units', date: '2024-10-28' },
    { id: 'FTF004', name: 'Organic Carrots', farmer: 'John Smith', location: 'In Transit', status: 'Shipped', quantity: '300 kg', date: '2024-10-26' },
    { id: 'FTF005', name: 'Fresh Spinach', farmer: 'Alice Green', location: 'Processing', status: 'Processing', quantity: '150 kg', date: '2024-10-29' },
  ]);
  const [productSearch, setProductSearch] = useState('');
  const [productStatusFilter, setProductStatusFilter] = useState('All');
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Alerts State
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', message: 'Temperature anomaly detected in shipment FTF004', time: new Date(Date.now() - 10 * 60000), read: false },
    { id: 2, type: 'error', message: 'Delivery delay for batch FTF001 - exceeds threshold', time: new Date(Date.now() - 60 * 60000), read: false },
    { id: 3, type: 'info', message: 'New user registration spike detected', time: new Date(Date.now() - 120 * 60000), read: false },
    { id: 4, type: 'success', message: 'All quality checks passed for batch FTF002', time: new Date(Date.now() - 180 * 60000), read: true },
  ]);

  // Statistics
  const [stats, setStats] = useState({
    totalUsers: 500,
    totalProducts: 1247,
    activeSupplyChains: 89,
    aiAlerts: 3
  });

  // Form states
  const [userForm, setUserForm] = useState({
    username: '',
    email: '',
    role: 'Farmer',
    status: 'Active'
  });

  const [productForm, setProductForm] = useState({
    name: '',
    farmer: '',
    location: '',
    status: 'Harvested',
    quantity: ''
  });

  // Update stats when data changes
  useEffect(() => {
    setStats({
      totalUsers: users.length,
      totalProducts: products.length,
      activeSupplyChains: products.filter(p => p.status === 'In Transit' || p.status === 'Shipped').length,
      aiAlerts: alerts.filter(a => !a.read).length
    });
  }, [users, products, alerts]);

  // Time formatting
  const formatTimeAgo = (date) => {
    const minutes = Math.floor((Date.now() - date) / 60000);
    if (minutes < 60) return `${minutes} mins ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  // User Management Functions
  const handleToggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
        : user
    ));
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUserForm({
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setShowUserModal(true);
  };

  const handleSaveUser = () => {
    if (editingUser) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...userForm }
          : user
      ));
    } else {
      // Add new user
      const newUser = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...userForm,
        joinDate: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, newUser]);
    }
    setShowUserModal(false);
    setEditingUser(null);
    setUserForm({ username: '', email: '', role: 'Farmer', status: 'Active' });
  };

  // Product Management Functions
  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== productId));
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      farmer: product.farmer,
      location: product.location,
      status: product.status,
      quantity: product.quantity
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = () => {
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(product => 
        product.id === editingProduct.id 
          ? { ...product, ...productForm }
          : product
      ));
    } else {
      // Add new product
      const newProduct = {
        id: `FTF${String(Math.max(...products.map(p => parseInt(p.id.slice(3)))) + 1).padStart(3, '0')}`,
        ...productForm,
        date: new Date().toISOString().split('T')[0]
      };
      setProducts([...products, newProduct]);
    }
    setShowProductModal(false);
    setEditingProduct(null);
    setProductForm({ name: '', farmer: '', location: '', status: 'Harvested', quantity: '' });
  };

  // Alert Functions
  const handleDismissAlert = (alertId) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const handleMarkAlertRead = (alertId) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, read: true }
        : alert
    ));
  };

  // Filter Functions
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(userSearch.toLowerCase()) ||
                         user.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = userRoleFilter === 'All' || user.role === userRoleFilter;
    return matchesSearch && matchesRole;
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.id.toLowerCase().includes(productSearch.toLowerCase()) ||
                         product.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                         product.farmer.toLowerCase().includes(productSearch.toLowerCase());
    const matchesStatus = productStatusFilter === 'All' || product.status === productStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Modal Component
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
          <div className="flex justify-between items-center p-6 border-b">
            <h3 className="text-xl font-bold">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <XCircleIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    );
  };

  // Sidebar Component
  const Sidebar = () => {
    const menuItems = [
      { id: 'overview', icon: HomeIcon, label: 'Overview' },
      { id: 'users', icon: UsersIcon, label: 'User Management' },
      { id: 'products', icon: CubeIcon, label: 'Product Tracking' },
      { id: 'analytics', icon: BeakerIcon, label: 'AI Analytics' },
      { id: 'alerts', icon: BellIcon, label: 'Alerts', badge: alerts.filter(a => !a.read).length },
    ];

    return (
      <div className="w-64 bg-gradient-to-b from-green-800 to-green-900 text-white h-screen fixed left-0 top-0 shadow-2xl">
        <div className="p-6 border-b border-green-700">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShieldCheckIcon className="w-8 h-8" />
            Farm-to-Fork
          </h1>
          <p className="text-green-300 text-sm mt-1">Admin Panel</p>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center justify-between gap-3 px-6 py-3 transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-green-700 border-l-4 border-white'
                  : 'hover:bg-green-700/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.badge > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    );
  };

  // Navbar Component
  const Navbar = () => (
    <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
        </h2>
        <p className="text-sm text-gray-500">Welcome back, {userRole}</p>
      </div>
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
      >
        <ArrowRightOnRectangleIcon className="w-5 h-5" />
        Logout
      </button>
    </div>
  );

  // Dashboard Card Component
  const DashboardCard = ({ title, value, icon: Icon, color }) => (
    <div className={`bg-gradient-to-br ${color} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-white text-3xl font-bold mt-2">{value}</p>
        </div>
        <Icon className="w-12 h-12 text-white/30" />
      </div>
    </div>
  );

  // Overview Section
  const OverviewSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Users"
          value={stats.totalUsers}
          icon={UserGroupIcon}
          color="from-blue-500 to-blue-600"
        />
        <DashboardCard
          title="Total Products"
          value={stats.totalProducts}
          icon={CubeIcon}
          color="from-green-500 to-green-600"
        />
        <DashboardCard
          title="Active Supply Chains"
          value={stats.activeSupplyChains}
          icon={TruckIcon}
          color="from-purple-500 to-purple-600"
        />
        <DashboardCard
          title="AI Alerts"
          value={stats.aiAlerts}
          icon={ExclamationTriangleIcon}
          color="from-orange-500 to-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">System Health</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Database Performance</span>
                <span className="text-sm font-semibold text-green-600">98%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{ width: '98%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">API Response Time</span>
                <span className="text-sm font-semibold text-green-600">95%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Blockchain Sync</span>
                <span className="text-sm font-semibold text-blue-600">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Recent Activity</h3>
          <div className="space-y-3">
            {alerts.slice(0, 4).map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.type === 'error' ? 'bg-red-500' :
                  alert.type === 'warning' ? 'bg-yellow-500' :
                  alert.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(alert.time)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // User Management Section
  const UserManagementSection = () => (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2 flex-1">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <select
            value={userRoleFilter}
            onChange={(e) => setUserRoleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="All">All Roles</option>
            <option value="Farmer">Farmer</option>
            <option value="Distributor">Distributor</option>
            <option value="Retailer">Retailer</option>
            <option value="Consumer">Consumer</option>
          </select>
        </div>
        <button
          onClick={() => {
            setEditingUser(null);
            setUserForm({ username: '', email: '', role: 'Farmer', status: 'Active' });
            setShowUserModal(true);
          }}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          Add User
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900">{user.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.username}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Edit"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleUserStatus(user.id)}
                        className={`p-1 ${
                          user.status === 'Active' 
                            ? 'text-orange-600 hover:text-orange-800' 
                            : 'text-green-600 hover:text-green-800'
                        }`}
                        title={user.status === 'Active' ? 'Disable' : 'Enable'}
                      >
                        {user.status === 'Active' ? <XCircleIcon className="w-4 h-4" /> : <CheckCircleIcon className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Delete"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Product Tracking Section
  const ProductTrackingSection = () => (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2 flex-1">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <select
            value={productStatusFilter}
            onChange={(e) => setProductStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="All">All Status</option>
            <option value="Harvested">Harvested</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null);
            setProductForm({ name: '', farmer: '', location: '', status: 'Harvested', quantity: '' });
            setShowProductModal(true);
          }}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Farmer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-gray-900">{product.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.farmer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.quantity}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.location}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      product.status === 'In Transit' || product.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      product.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Edit"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Delete"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // AI Analytics Section
  const AIAnalyticsSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-gray-800">Anomaly Detection</h4>
            <ExclamationTriangleIcon className="w-8 h-8 text-orange-500" />
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-orange-500">{stats.aiAlerts}</p>
            <p className="text-sm text-gray-600 mt-2">Active Anomalies Detected</p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">Last scan: 5 minutes ago</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-gray-800">Risk Assessment</h4>
            <ChartBarIcon className="w-8 h-8 text-red-500" />
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-green-500">Low</p>
            <p className="text-sm text-gray-600 mt-2">Overall Risk Level</p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">Risk score: 23/100</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-gray-800">Prediction Accuracy</h4>
            <CheckCircleIcon className="w-8 h-8 text-green-500" />
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-500">94.7%</p>
            <p className="text-sm text-gray-600 mt-2">Model Performance</p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">Based on 10,000+ predictions</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">AI Insights</h3>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
            <h5 className="font-semibold text-blue-900 mb-1">Delivery Time Optimization</h5>
            <p className="text-sm text-blue-800">AI model suggests alternative routes could reduce delivery time by 15% for Region A.</p>
          </div>
          <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
            <h5 className="font-semibold text-green-900 mb-1">Quality Prediction</h5>
            <p className="text-sm text-green-800">Current batch quality is predicted to maintain 98% freshness for next 48 hours.</p>
          </div>
          <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded">
            <h5 className="font-semibold text-purple-900 mb-1">Demand Forecasting</h5>
            <p className="text-sm text-purple-800">Expected 23% increase in organic produce demand next week based on historical patterns.</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Alerts Section
  const AlertsSection = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">System Alerts & Notifications</h3>
        <button
          onClick={() => setAlerts(alerts.map(a => ({ ...a, read: true })))}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Mark all as read
        </button>
      </div>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg border-l-4 ${
              alert.type === 'error' ? 'bg-red-50 border-red-500' :
              alert.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
              alert.type === 'success' ? 'bg-green-50 border-green-500' :
              'bg-blue-50 border-blue-500'
            } ${alert.read ? 'opacity-60' : ''}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                {alert.type === 'error' && <XCircleIcon className="w-5 h-5 text-red-500 mt-0.5" />}
                {alert.type === 'warning' && <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500 mt-0.5" />}
                {alert.type === 'success' && <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5" />}
                {alert.type === 'info' && <BellIcon className="w-5 h-5 text-blue-500 mt-0.5" />}
                <div className="flex-1">
                  <p className={`font-medium ${
                    alert.type === 'error' ? 'text-red-900' :
                    alert.type === 'warning' ? 'text-yellow-900' :
                    alert.type === 'success' ? 'text-green-900' :
                    'text-blue-900'
                  }`}>
                    {alert.message}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <ClockIcon className="w-3 h-3 text-gray-400" />
                    <p className="text-xs text-gray-600">{formatTimeAgo(alert.time)}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {!alert.read && (
                  <button
                    onClick={() => handleMarkAlertRead(alert.id)}
                    className="text-gray-400 hover:text-gray-600"
                    title="Mark as read"
                  >
                    <CheckCircleIcon className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => handleDismissAlert(alert.id)}
                  className="text-gray-400 hover:text-gray-600"
                  title="Dismiss"
                >
                  <XCircleIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {alerts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <BellIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>No alerts at this time</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <div className="p-6">
          {activeSection === 'overview' && <OverviewSection />}
          {activeSection === 'users' && <UserManagementSection />}
          {activeSection === 'products' && <ProductTrackingSection />}
          {activeSection === 'analytics' && <AIAnalyticsSection />}
          {activeSection === 'alerts' && <AlertsSection />}
        </div>
      </div>

      {/* User Modal */}
      <Modal
        isOpen={showUserModal}
        onClose={() => {
          setShowUserModal(false);
          setEditingUser(null);
        }}
        title={editingUser ? 'Edit User' : 'Add New User'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={userForm.username}
              onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={userForm.email}
              onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              value={userForm.role}
              onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="Farmer">Farmer</option>
              <option value="Distributor">Distributor</option>
              <option value="Retailer">Retailer</option>
              <option value="Consumer">Consumer</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={userForm.status}
              onChange={(e) => setUserForm({ ...userForm, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex gap-2 pt-4">
            <button
              onClick={handleSaveUser}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              {editingUser ? 'Update User' : 'Add User'}
            </button>
            <button
              onClick={() => {
                setShowUserModal(false);
                setEditingUser(null);
              }}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Product Modal */}
      <Modal
        isOpen={showProductModal}
        onClose={() => {
          setShowProductModal(false);
          setEditingProduct(null);
        }}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              value={productForm.name}
              onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Farmer</label>
            <input
              type="text"
              value={productForm.farmer}
              onChange={(e) => setProductForm({ ...productForm, farmer: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter farmer name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              type="text"
              value={productForm.quantity}
              onChange={(e) => setProductForm({ ...productForm, quantity: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="e.g., 500 kg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={productForm.location}
              onChange={(e) => setProductForm({ ...productForm, location: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter current location"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={productForm.status}
              onChange={(e) => setProductForm({ ...productForm, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="Harvested">Harvested</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
          <div className="flex gap-2 pt-4">
            <button
              onClick={handleSaveProduct}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              {editingProduct ? 'Update Product' : 'Add Product'}
            </button>
            <button
              onClick={() => {
                setShowProductModal(false);
                setEditingProduct(null);
              }}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminDashboard;