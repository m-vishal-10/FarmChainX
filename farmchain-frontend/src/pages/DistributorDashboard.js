import React, { useState, useEffect } from 'react';
import {
  Truck, Package, CheckCircle, Clock, AlertTriangle, User, LogOut, MapPin, Calendar,
  Box, ArrowRight, Save, Bell, XCircle, Search, Moon, Sun, Mail, Phone, Building, X, Filter
} from 'lucide-react';

// API imports (make sure these exist at src/api/distributorApi.js)
import {
  distributorGetFarmerProducts,
  distributorGetShipments,
  distributorCreateShipment
} from '../api/distributorApi';

const DistributorDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // ✅ Removed dummy data - will be populated from backend
  const [shipments, setShipments] = useState([]);            // incoming shipments
  const [activeShipments, setActiveShipments] = useState([]); // active/ongoing shipments
  const [products, setProducts] = useState([]);              // farmer products (if needed)

  const [notifications, setNotifications] = useState([]); // you can fetch notifications from backend later

  const [userProfile] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh@distributor.com',
    phone: '+91 98765 43210',
    company: 'Fresh Logistics Ltd',
    role: 'Distribution Manager',
    avatar: 'RK'
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [showProcessingForm, setShowProcessingForm] = useState(false);

  // include quantity so distributor can set different shipped quantity if needed
  const [processingData, setProcessingData] = useState({
    vehicleId: '',
    driverName: '',
    destination: '',
    estimatedDelivery: '',
    quantity: ''
  });

  // --- LOADERS: fetch from backend ---
  const loadProducts = async () => {
    try {
      const res = await distributorGetFarmerProducts();
      // Expecting res.data to be array of products
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Failed to load farmer products:', err);
    }
  };

  const loadShipments = async () => {
    try {
      const res = await distributorGetShipments();
      const data = Array.isArray(res.data) ? res.data : [];

      // Depending on backend structure, split active vs incoming by status
      const incoming = data.filter(s => s.status !== 'In Transit' && s.status !== 'Delivered');
      const active = data.filter(s => s.status === 'In Transit' || s.status === 'Preparing' || s.status === 'Delayed');

      setShipments(incoming);
      setActiveShipments(active);
    } catch (err) {
      console.error('Failed to load shipments:', err);
    }
  };

  // load both when component mounts
  useEffect(() => {
    loadProducts();
    loadShipments();
    // optionally load notifications from backend if endpoint exists
  }, []);

  // --- Notifications helpers (still local, can be replaced by backend calls later) ---
  const addNotification = (type, message) => {
    const newNotif = { id: Date.now(), type, message, time: 'Just now', read: false };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  // --- Status updates (local optimistic update; you can wire to backend endpoints if available) ---
  const updateShipmentStatus = (id, newStatus) => {
    setShipments(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
    addNotification('info', `Shipment ${id} status updated to ${newStatus}`);
    // Optionally reload shipments from backend:
    // loadShipments();
  };

  const updateActiveShipmentStatus = (id, newStatus) => {
    setActiveShipments(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
    addNotification('info', `Active shipment ${id} status updated to ${newStatus}`);
    // Optionally reload from backend:
    // loadShipments();
  };

  // When user clicks "Process" on an incoming shipment, we'll open the modal and let them create a shipment (backend)
  const handleProcessShipment = (shipment) => {
    setSelectedShipment(shipment);
    // prefill quantity (if available) and destination from shipment
    setProcessingData({
      vehicleId: '',
      driverName: '',
      destination: shipment?.destination || '',
      estimatedDelivery: '',
      quantity: shipment?.quantity ? String(shipment.quantity).replace(/\D/g, '') : '' // normalize
    });
    setShowProcessingForm(true);
  };

  // Create shipment via backend call, then refresh shipments
  const submitProcessing = async () => {
    if (!selectedShipment) {
      alert('No shipment selected');
      return;
    }

    const { vehicleId, driverName, destination, estimatedDelivery, quantity } = processingData;
    if (!vehicleId || !driverName || !destination) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      // Build payload expected by backend:
      const payload = {
        productId: selectedShipment.productId || selectedShipment.product?.id || selectedShipment.productId,
        quantity: quantity || selectedShipment.quantity || 1,
        vehicleId,
        driverName,
        destination,
        estimatedDelivery
      };

      await distributorCreateShipment(payload);

      // refresh shipments from backend
      await loadShipments();

      setShowProcessingForm(false);
      setProcessingData({ vehicleId: '', driverName: '', destination: '', estimatedDelivery: '', quantity: '' });
      addNotification('info', `Shipment ${selectedShipment.id} processed successfully!`);

    } catch (err) {
      console.error('Failed to create shipment:', err);
      alert('Failed to process shipment. See console for details.');
    }
  };

  // --- Utility functions ---
  const getStatusColor = (status) => {
    const colors = {
      'Approved': darkMode ? 'bg-green-900 text-green-200 border-green-700' : 'bg-green-100 text-green-800 border-green-300',
      'Pending Inspection': darkMode ? 'bg-yellow-900 text-yellow-200 border-yellow-700' : 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Rejected': darkMode ? 'bg-red-900 text-red-200 border-red-700' : 'bg-red-100 text-red-800 border-red-300',
      'In Transit': darkMode ? 'bg-blue-900 text-blue-200 border-blue-700' : 'bg-blue-100 text-blue-800 border-blue-300',
      'Delivered': darkMode ? 'bg-green-900 text-green-200 border-green-700' : 'bg-green-100 text-green-800 border-green-300',
      'Preparing': darkMode ? 'bg-purple-900 text-purple-200 border-purple-700' : 'bg-purple-100 text-purple-800 border-purple-300',
      'Delayed': darkMode ? 'bg-orange-900 text-orange-200 border-orange-700' : 'bg-orange-100 text-orange-800 border-orange-300'
    };
    return colors[status] || (darkMode ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-gray-100 text-gray-800 border-gray-300');
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'error': return <XCircle className="h-5 w-5 text-red-600" />;
      default: return <Bell className="h-5 w-5 text-blue-600" />;
    }
  };

  // Stats derived from state
  const stats = {
    totalReceived: shipments.length,
    inTransit: activeShipments.filter(s => s.status === 'In Transit').length,
    delivered: activeShipments.filter(s => s.status === 'Delivered').length,
    pending: shipments.filter(s => s.status === 'Pending Inspection').length
  };

  // Filtered shipments for UI search/filter
  const filteredShipments = shipments.filter(ship => {
    const matchesSearch =
      (ship.productName && ship.productName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (ship.farmerName && ship.farmerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (ship.id && ship.id.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === 'all' || ship.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-teal-50'}`}>
      <nav className={`shadow-lg transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-600 to-indigo-600'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Truck className={`h-8 w-8 ${darkMode ? 'text-blue-400' : 'text-white'}`} />
              <h1 className="text-2xl font-bold text-white">Distributor Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-700'}`} title={darkMode ? 'Light Mode' : 'Dark Mode'}>
                {darkMode ? <Sun className="h-6 w-6 text-yellow-400" /> : <Moon className="h-6 w-6 text-white" />}
              </button>

              <div className="relative">
                <button onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }} className={`relative p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-700'}`}>
                  <Bell className="h-6 w-6 text-white" />
                  {unreadCount > 0 && <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-bold">{unreadCount}</span>}
                </button>

                {showNotifications && (
                  <div className={`absolute right-0 mt-2 w-96 rounded-xl shadow-2xl z-50 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
                    <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <div className="flex justify-between items-center">
                        <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>Notifications</h3>
                        <div className="flex items-center space-x-2">
                          {notifications.length > 0 && <button onClick={clearAllNotifications} className="text-sm text-blue-600 hover:text-blue-800 font-semibold">Clear All</button>}
                          <button onClick={() => setShowNotifications(false)} className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}><X className="h-4 w-4" /></button>
                        </div>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center">
                          <Bell className={`h-12 w-12 mx-auto mb-3 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>No notifications</p>
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <div key={notif.id} onClick={() => markNotificationAsRead(notif.id)} className={`p-4 border-b cursor-pointer transition-colors ${darkMode ? `border-gray-700 ${notif.read ? 'bg-gray-800' : 'bg-gray-700 hover:bg-gray-650'}` : `border-gray-200 ${notif.read ? 'bg-white' : 'bg-blue-50 hover:bg-blue-100'}`}`}>
                            <div className="flex items-start space-x-3">
                              {getNotificationIcon(notif.type)}
                              <div className="flex-1">
                                <p className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{notif.message}</p>
                                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{notif.time}</p>
                              </div>
                              {!notif.read && <span className="h-2 w-2 bg-blue-600 rounded-full mt-1"></span>}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }} className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-700'}`}>
                  <User className="h-6 w-6 text-white" />
                </button>

                {showProfile && (
                  <div className={`absolute right-0 mt-2 w-80 rounded-xl shadow-2xl z-50 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
                    <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">{userProfile.avatar}</div>
                          <div>
                            <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>{userProfile.name}</h3>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{userProfile.role}</p>
                          </div>
                        </div>
                        <button onClick={() => setShowProfile(false)} className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}><X className="h-4 w-4" /></button>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{userProfile.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{userProfile.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Building className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{userProfile.company}</span>
                      </div>
                    </div>
                    <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105">Edit Profile</button>
                    </div>
                  </div>
                )}
              </div>

              <button onClick={() => window.location.href = '/'} className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-700'}`} title="Logout">
                <LogOut className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold opacity-90">Total Received</h3>
              <Package className="h-8 w-8" />
            </div>
            <p className="text-4xl font-bold">{stats.totalReceived}</p>
            <p className="text-sm opacity-80 mt-2">Shipments</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold opacity-90">In Transit</h3>
              <Truck className="h-8 w-8" />
            </div>
            <p className="text-4xl font-bold">{stats.inTransit}</p>
            <p className="text-sm opacity-80 mt-2">Active Shipments</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold opacity-90">Delivered</h3>
              <CheckCircle className="h-8 w-8" />
            </div>
            <p className="text-4xl font-bold">{stats.delivered}</p>
            <p className="text-sm opacity-80 mt-2">Completed</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold opacity-90">Pending</h3>
              <Clock className="h-8 w-8" />
            </div>
            <p className="text-4xl font-bold">{stats.pending}</p>
            <p className="text-sm opacity-80 mt-2">Awaiting Inspection</p>
          </div>
        </div>

        <div className={`rounded-xl shadow-lg p-6 mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
            <h2 className={`text-2xl font-bold flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              <Box className="h-7 w-7 mr-2 text-blue-600" />
              Incoming Shipments
            </h2>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input type="text" placeholder="Search shipments..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={`w-full pl-10 pr-4 py-2 border-2 rounded-lg focus:outline-none text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' : 'border-gray-300 focus:border-blue-500'}`} />
              </div>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className={`px-4 py-2 border-2 rounded-lg focus:outline-none text-sm font-semibold ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' : 'border-gray-300 focus:border-blue-500'}`}>
                <option value="all">All Status</option>
                <option value="Approved">Approved</option>
                <option value="Pending Inspection">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredShipments.length === 0 ? (
              <div className="text-center py-12">
                <Package className={`h-16 w-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No shipments found</p>
              </div>
            ) : (
              filteredShipments.map((shipment) => (
                <div key={shipment.id} className={`border-2 rounded-xl p-4 hover:shadow-md transition-all ${darkMode ? 'border-gray-700 hover:border-blue-500' : 'border-gray-200 hover:border-blue-400'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{shipment.id}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(shipment.status)}`}>{shipment.status}</span>
                      </div>
                      <h3 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{shipment.productName}</h3>
                      <p className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Product ID: {shipment.productId}</p>
                    </div>
                    {shipment.status === 'Approved' && (
                      <button onClick={() => handleProcessShipment(shipment)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center">
                        <ArrowRight className="h-4 w-4 mr-1" />Process
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <User className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="font-medium">Farmer:</span>
                      <span className="ml-1 truncate">{shipment.farmerName}</span>
                    </div>
                    <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <Package className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="font-medium">Qty:</span>
                      <span className="ml-1">{shipment.quantity}</span>
                    </div>
                    <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="font-medium">Received:</span>
                      <span className="ml-1">{shipment.receivedDate}</span>
                    </div>
                  </div>

                  {shipment.status === 'Pending Inspection' && (
                    <div className="flex space-x-2 mt-4">
                      <button onClick={() => updateShipmentStatus(shipment.id, 'Approved')} className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors">Approve</button>
                      <button onClick={() => updateShipmentStatus(shipment.id, 'Rejected')} className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors">Reject</button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className={`rounded-xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-2xl font-bold mb-6 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            <Truck className="h-7 w-7 mr-2 text-blue-600" />
            Active Shipments
          </h2>
          <div className="space-y-4">
            {activeShipments.length === 0 ? (
              <div className="text-center py-12">
                <Truck className={`h-16 w-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No active shipments</p>
              </div>
            ) : (
              activeShipments.map((shipment) => (
                <div key={shipment.id} className={`border-2 rounded-xl p-5 hover:shadow-md transition-all ${darkMode ? 'border-gray-700 hover:border-blue-500' : 'border-gray-200 hover:border-blue-400'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{shipment.productName}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(shipment.status)}`}>{shipment.status}</span>
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Shipment ID: {shipment.id}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                      <p className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Destination</p>
                      <p className={`font-semibold flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        <MapPin className="h-4 w-4 mr-1 text-blue-600" />
                        {shipment.destination}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                      <p className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Vehicle ID</p>
                      <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{shipment.vehicleId || 'Not Assigned'}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                      <p className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Driver</p>
                      <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{shipment.driverName || 'Not Assigned'}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className={`flex items-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <Calendar className="h-4 w-4 mr-1" />
                      Est. Delivery: {shipment.estimatedDelivery}
                    </div>
                    <select
                      value={shipment.status}
                      onChange={(e) => updateActiveShipmentStatus(shipment.id, e.target.value)}
                      className={`px-4 py-2 border-2 rounded-lg focus:outline-none text-sm font-semibold ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' : 'border-gray-300 focus:border-blue-500'}`}
                    >
                      <option value="Preparing">Preparing</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Delayed">Delayed</option>
                    </select>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {showProcessingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl shadow-2xl max-w-2xl w-full p-8 max-h-screen overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Process Shipment</h2>

            <div className={`mb-6 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
              <p className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Processing shipment for:</p>
              <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{selectedShipment?.productName}</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Shipment ID: {selectedShipment?.id}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Vehicle ID *</label>
                <input
                  type="text"
                  value={processingData.vehicleId}
                  onChange={(e) => setProcessingData({...processingData, vehicleId: e.target.value})}
                  placeholder="e.g., TRK-456"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' : 'border-gray-300 focus:border-blue-500'}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Driver Name *</label>
                <input
                  type="text"
                  value={processingData.driverName}
                  onChange={(e) => setProcessingData({...processingData, driverName: e.target.value})}
                  placeholder="Enter driver name"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' : 'border-gray-300 focus:border-blue-500'}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Destination *</label>
                <input
                  type="text"
                  value={processingData.destination}
                  onChange={(e) => setProcessingData({...processingData, destination: e.target.value})}
                  placeholder="e.g., Fresh Mart Store"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' : 'border-gray-300 focus:border-blue-500'}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Quantity *</label>
                <input
                  type="number"
                  value={processingData.quantity}
                  onChange={(e) => setProcessingData({...processingData, quantity: e.target.value})}
                  placeholder="e.g., 500"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' : 'border-gray-300 focus:border-blue-500'}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Estimated Delivery Date</label>
                <input
                  type="date"
                  value={processingData.estimatedDelivery}
                  onChange={(e) => setProcessingData({...processingData, estimatedDelivery: e.target.value})}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' : 'border-gray-300 focus:border-blue-500'}`}
                />
              </div>
            </div>

            <div className="flex space-x-4 mt-8">
              <button
                onClick={submitProcessing}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 flex items-center justify-center"
              >
                <Save className="h-5 w-5 mr-2" />
                Submit & Create Shipment
              </button>
              <button
                onClick={() => setShowProcessingForm(false)}
                className={`px-6 py-3 border-2 rounded-lg font-semibold transition-colors ${darkMode ? 'border-gray-600 hover:bg-gray-700 text-white' : 'border-gray-300 hover:bg-gray-100'}`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DistributorDashboard;
