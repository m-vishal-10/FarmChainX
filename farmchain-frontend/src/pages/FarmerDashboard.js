import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sun, Moon, LogOut, Upload, TrendingUp, CheckCircle, Clock, XCircle, Bell, MapPin, Calendar, 
  Package, BarChart3, Leaf, User, Phone 
} from 'lucide-react';

// 🔥 Import backend APIs
import { farmerGetProducts, farmerAddProduct } from "../api/farmerApi";

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  // 📌 Products fetched from backend
  const [products, setProducts] = useState([]);

  // 📌 Form for adding products
  const [form, setForm] = useState({
    name: '',
    type: '',
    quantity: '',
    location: '',
    date: '',
    grade: 'A'
  });

  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Batch FP001 approved by distributor', time: '2 hours ago', type: 'success' },
    { id: 2, message: 'Quality inspection scheduled for FP003', time: '5 hours ago', type: 'info' },
    { id: 3, message: 'Payment received for FP002', time: '1 day ago', type: 'success' }
  ]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [farmerProfile, setFarmerProfile] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@farm.com',
    phone: '+91 98765 43210',
    farmName: 'Green Valley Farms',
    location: 'Kovilpatti, Tamil Nadu',
    joinedDate: 'January 2024',
    totalHarvests: 47,
    certifications: ['Organic Certified', 'Fair Trade']
  });

  // 🔥 Load products from backend
  const loadProducts = async () => {
    try {
      const res = await farmerGetProducts();
      setProducts(res.data);
    } catch (err) {
      console.error("Failed loading products:", err);
    }
  };

  // 🔥 Load products on page load
  useEffect(() => {
    loadProducts();
  }, []);

  // 🔥 Add product through backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.type || !form.quantity || !form.location || !form.date) {
      alert('Please fill in all fields');
      return;
    }

    const newProduct = {
      name: form.name,
      type: form.type,
      quantity: form.quantity,
      location: form.location,
      date: form.date,
      grade: form.grade
    };

    try {
      await farmerAddProduct(newProduct);
      await loadProducts();

      setForm({ name: "", type: "", quantity: "", location: "", date: "", grade: "A" });

      alert("Product uploaded successfully!");

      setNotifications([{
        id: notifications.length + 1,
        message: `New product ${form.name} uploaded successfully`,
        time: 'Just now',
        type: 'success'
      }, ...notifications]);

    } catch (err) {
      console.error(err);
      alert("Failed to upload product");
    }
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowDetailsModal(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
      setNotifications([{
        id: notifications.length + 1,
        message: `Product ${productId} deleted`,
        time: 'Just now',
        type: 'info'
      }, ...notifications]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.clear();
    alert('Logged out!');
    setTimeout(() => navigate('/'), 700);
  };

  const handleStatusChange = (productId, newStatus) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, status: newStatus } : p
    ));
  };

  const clearNotification = (notifId) => {
    setNotifications(notifications.filter(n => n.id !== notifId));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const stats = {
    total: products.length,
    approved: products.filter(p => p.status === 'Approved').length,
    pending: products.filter(p => p.status === 'Pending').length,
    rejected: products.filter(p => p.status === 'Rejected').length
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Approved': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
      case 'Pending': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
      case 'In Transit': return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20';
      case 'Rejected': return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-green-600 p-2 rounded-lg">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Farmer Dashboard</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition relative"
                  >
                    <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                    {notifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {notifications.length}
                      </span>
                    )}
                  </button>
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                        {notifications.length > 0 && (
                          <button
                            onClick={clearAllNotifications}
                            className="text-xs text-red-600 hover:text-red-700"
                          >
                            Clear All
                          </button>
                        )}
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <p className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">No notifications</p>
                        ) : (
                          notifications.map((notif) => (
                            <div key={notif.id} className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <p className="text-sm text-gray-800 dark:text-gray-200">{notif.message}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.time}</p>
                                </div>
                                <button
                                  onClick={() => clearNotification(notif.id)}
                                  className="text-gray-400 hover:text-red-600 ml-2"
                                >
                                  <XCircle className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                  {darkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-700" />}
                </button>
                <button
                  onClick={() => setShowProfileModal(true)}
                  className="flex items-center space-x-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                  <User className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">{farmerProfile.name}</span>
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Products</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.total}</p>
                </div>
                <Package className="h-12 w-12 text-green-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Approved Shipments</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.approved}</p>
                </div>
                <CheckCircle className="h-12 w-12 text-blue-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-yellow-500 hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Pending Approvals</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.pending}</p>
                </div>
                <Clock className="h-12 w-12 text-yellow-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-red-500 hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Rejected Batches</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.rejected}</p>
                </div>
                <XCircle className="h-12 w-12 text-red-500" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Product Upload Section */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Upload className="h-6 w-6 text-green-600" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Upload New Product</h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Name</label>
                      <input
                        type="text"
                        placeholder="e.g., Organic Tomatoes"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Crop Type</label>
                      <input
                        type="text"
                        placeholder="e.g., Vegetable, Grain"
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quantity (kg)</label>
                      <input
                        type="number"
                        placeholder="e.g., 500"
                        value={form.quantity}
                        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quality Grade</label>
                      <select
                        value={form.grade}
                        onChange={(e) => setForm({ ...form, grade: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="A">Grade A (Premium)</option>
                        <option value="B">Grade B (Standard)</option>
                        <option value="C">Grade C (Economy)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Harvest Date</label>
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Farm Location</label>
                      <input
                        type="text"
                        placeholder="e.g., Farm A, Kerala"
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <Upload className="h-5 w-5" />
                    <span>Upload Product</span>
                  </button>
                </form>
              </div>

              {/* Products Table */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Uploaded Products</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Product ID</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Name</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Quantity</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                          <td className="py-4 px-4 text-sm font-medium text-gray-900 dark:text-white">{product.id}</td>
                          <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">{product.name}</td>
                          <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">{product.quantity} kg</td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(product.status)}`}>
                              {product.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <button
                              onClick={() => handleViewDetails(product)}
                              className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm font-medium mr-4"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* AI Insights */}
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center space-x-3 mb-4">
                  <BarChart3 className="h-6 w-6" />
                  <h3 className="text-lg font-bold">AI Insights</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                    <p className="text-sm font-medium mb-2">Quality Score</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-white/30 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                      <span className="text-xl font-bold">92%</span>
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                    <p className="text-sm font-medium mb-1">Best Transport Date</p>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <p className="text-lg font-bold">Nov 5, 2025</p>
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                    <p className="text-sm font-medium mb-1">Crop Health Status</p>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4" />
                      <p className="text-lg font-bold">Excellent</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Bell className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Activity</h3>
                  </div>
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold px-2 py-1 rounded-full">
                    {notifications.length} new
                  </span>
                </div>
                <div className="space-y-3">
                  {notifications.slice(0, 5).map((notif) => (
                    <div key={notif.id} className="border-l-4 border-green-500 bg-gray-50 dark:bg-gray-700/50 p-3 rounded">
                      <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">{notif.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.time}</p>
                    </div>
                  ))}
                  {notifications.length > 5 && (
                    <button
                      onClick={() => setShowNotifications(true)}
                      className="w-full text-center text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium py-2"
                    >
                      View all {notifications.length} notifications
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Product Details Modal */}
        {showDetailsModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowDetailsModal(false)}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Product Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Product ID</label>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">{selectedProduct.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Product Name</label>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">{selectedProduct.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Crop Type</label>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">{selectedProduct.type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Quantity</label>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">{selectedProduct.quantity} kg</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Quality Grade</label>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">Grade {selectedProduct.grade}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Harvest Date</label>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">{selectedProduct.date}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Farm Location</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <MapPin className="h-5 w-5 text-green-600" />
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedProduct.location}</p>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">Current Status</label>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold inline-block ${getStatusColor(selectedProduct.status)}`}>
                      {selectedProduct.status}
                    </span>
                  </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">Change Status</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        handleStatusChange(selectedProduct.id, 'Approved');
                        setShowDetailsModal(false);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      Mark as Approved
                    </button>
                    <button
                      onClick={() => {
                        handleStatusChange(selectedProduct.id, 'In Transit');
                        setShowDetailsModal(false);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Mark as In Transit
                    </button>
                    <button
                      onClick={() => {
                        handleStatusChange(selectedProduct.id, 'Pending');
                        setShowDetailsModal(false);
                      }}
                      className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
                    >
                      Mark as Pending
                    </button>
                    <button
                      onClick={() => {
                        handleStatusChange(selectedProduct.id, 'Rejected');
                        setShowDetailsModal(false);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      Mark as Rejected
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Logout Confirmation Modal */}
        {showLogoutModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowLogoutModal(false)}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
                  <LogOut className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">Confirm Logout</h3>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                  Are you sure you want to logout? You'll need to login again to access your dashboard.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                  >
                    Yes, Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Profile Modal */}
        {showProfileModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowProfileModal(false)}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Farmer Profile</h2>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mb-4">
                    <span className="text-4xl font-bold text-white">{farmerProfile.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{farmerProfile.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{farmerProfile.farmName}</p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Email Address</span>
                      </label>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white mt-2">{farmerProfile.email}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>Phone Number</span>
                      </label>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white mt-2">{farmerProfile.phone}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>Location</span>
                      </label>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white mt-2">{farmerProfile.location}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>Member Since</span>
                      </label>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white mt-2">{farmerProfile.joinedDate}</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 border-2 border-green-200 dark:border-green-800">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2 mb-3">
                      <Package className="h-4 w-4" />
                      <span>Statistics</span>
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-green-600 dark:text-green-400">{farmerProfile.totalHarvests}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Harvests</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.approved}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Approved</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-green-600 dark:text-green-400">92%</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Quality Score</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2 mb-3">
                      <CheckCircle className="h-4 w-4" />
                      <span>Certifications</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {farmerProfile.certifications.map((cert, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium">
                      Edit Profile
                    </button>
                    <button
                      onClick={() => setShowProfileModal(false)}
                      className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition font-medium"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerDashboard;