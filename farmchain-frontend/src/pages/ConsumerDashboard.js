import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  QrCode,
  MapPin,
  Calendar,
  CheckCircle,
  AlertCircle,
  Star,
  User,
  LogOut,
  Sprout,
  TrendingUp,
  Home,
  History,
  Bell,
  Settings,
  Package,
  Award,
  Filter,
  X,
  Menu,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

// Dummy data
const dummyProducts = [
  {
    id: "FTF-2024-001",
    name: "Organic Basmati Rice",
    type: "Rice",
    harvestDate: "2024-10-15",
    expiryDate: "2025-10-15",
    origin: "Punjab, India",
    status: "Verified",
    freshnessScore: 95,
    authenticity: "Pass",
    aiFlag: false,
    farmer: "Green Valley Farms",
    farmerLocation: "Punjab, India",
    distributor: "AgriConnect Logistics",
    retailer: "Fresh Mart Store",
    certification: "Organic Certified",
    purchaseDate: "2024-07-25",
    timeline: [
      {
        stage: "Farmer",
        name: "Green Valley Farms",
        date: "2024-10-15",
        location: "Punjab, India",
        verified: true,
      },
      {
        stage: "Distributor",
        name: "AgriConnect Logistics",
        date: "2024-10-18",
        location: "Mumbai, India",
        verified: true,
      },
      {
        stage: "Retailer",
        name: "Fresh Mart Store",
        date: "2024-10-22",
        location: "Bangalore, India",
        verified: true,
      },
      {
        stage: "Consumer",
        name: "You",
        date: "2024-10-25",
        location: "Bangalore, India",
        verified: true,
      },
    ],
  },
  {
    id: "FTF-2024-002",
    name: "Fresh Tomatoes",
    type: "Vegetable",
    harvestDate: "2024-10-28",
    expiryDate: "2024-11-05",
    origin: "Karnataka, India",
    status: "Verified",
    freshnessScore: 92,
    authenticity: "Pass",
    aiFlag: false,
    farmer: "Sunrise Organic Farm",
    farmerLocation: "Karnataka, India",
    distributor: "Fresh Logistics Co.",
    retailer: "Green Grocer",
    certification: "Pesticide Free",
    purchaseDate: "2024-08-29",
    timeline: [
      {
        stage: "Farmer",
        name: "Sunrise Organic Farm",
        date: "2024-10-28",
        location: "Karnataka, India",
        verified: true,
      },
      {
        stage: "Distributor",
        name: "Fresh Logistics Co.",
        date: "2024-10-28",
        location: "Bangalore, India",
        verified: true,
      },
      {
        stage: "Retailer",
        name: "Green Grocer",
        date: "2024-10-29",
        location: "Bangalore, India",
        verified: true,
      },
      {
        stage: "Consumer",
        name: "You",
        date: "2024-10-29",
        location: "Bangalore, India",
        verified: true,
      },
    ],
  },
  {
    id: "FTF-2024-003",
    name: "Wheat Flour",
    type: "Grain",
    harvestDate: "2024-09-20",
    expiryDate: "2025-03-20",
    origin: "Haryana, India",
    status: "Flagged",
    freshnessScore: 78,
    authenticity: "Warning",
    aiFlag: true,
    farmer: "Golden Fields Farm",
    farmerLocation: "Haryana, India",
    distributor: "AgriTrans Network",
    retailer: "Super Mart",
    certification: "Standard Quality",
    purchaseDate: "2024-09-20",
    timeline: [
      {
        stage: "Farmer",
        name: "Golden Fields Farm",
        date: "2024-09-20",
        location: "Haryana, India",
        verified: true,
      },
      {
        stage: "Distributor",
        name: "AgriTrans Network",
        date: "2024-09-25",
        location: "Delhi, India",
        verified: false,
      },
      {
        stage: "Retailer",
        name: "Super Mart",
        date: "2024-10-15",
        location: "Bangalore, India",
        verified: true,
      },
      {
        stage: "Consumer",
        name: "You",
        date: "2024-10-20",
        location: "Bangalore, India",
        verified: true,
      },
    ],
  },
  {
    id: "FTF-2024-004",
    name: "Organic Mangoes",
    type: "Fruit",
    harvestDate: "2024-08-10",
    expiryDate: "2024-08-20",
    origin: "Maharashtra, India",
    status: "Verified",
    freshnessScore: 88,
    authenticity: "Pass",
    aiFlag: false,
    farmer: "Mango Paradise",
    farmerLocation: "Maharashtra, India",
    distributor: "Fruit Express",
    retailer: "Fresh Fruit Market",
    certification: "Organic Certified",
    purchaseDate: "2024-08-12",
    timeline: [
      {
        stage: "Farmer",
        name: "Mango Paradise",
        date: "2024-08-10",
        location: "Maharashtra, India",
        verified: true,
      },
      {
        stage: "Distributor",
        name: "Fruit Express",
        date: "2024-08-11",
        location: "Pune, India",
        verified: true,
      },
      {
        stage: "Retailer",
        name: "Fresh Fruit Market",
        date: "2024-08-12",
        location: "Bangalore, India",
        verified: true,
      },
      {
        stage: "Consumer",
        name: "You",
        date: "2024-08-12",
        location: "Bangalore, India",
        verified: true,
      },
    ],
  },
  {
    id: "FTF-2024-005",
    name: "Fresh Spinach",
    type: "Vegetable",
    harvestDate: "2024-10-05",
    expiryDate: "2024-10-12",
    origin: "Karnataka, India",
    status: "Verified",
    freshnessScore: 94,
    authenticity: "Pass",
    aiFlag: false,
    farmer: "Green Leaf Farms",
    farmerLocation: "Karnataka, India",
    distributor: "Veggie Direct",
    retailer: "Organic Store",
    certification: "Pesticide Free",
    purchaseDate: "2024-10-06",
    timeline: [
      {
        stage: "Farmer",
        name: "Green Leaf Farms",
        date: "2024-10-05",
        location: "Karnataka, India",
        verified: true,
      },
      {
        stage: "Distributor",
        name: "Veggie Direct",
        date: "2024-10-05",
        location: "Bangalore, India",
        verified: true,
      },
      {
        stage: "Retailer",
        name: "Organic Store",
        date: "2024-10-06",
        location: "Bangalore, India",
        verified: true,
      },
      {
        stage: "Consumer",
        name: "You",
        date: "2024-10-06",
        location: "Bangalore, India",
        verified: true,
      },
    ],
  },
];

const dummyNotifications = [
  {
    id: 1,
    message: "Your product trace verification was successful",
    date: "2024-10-29",
    read: false,
    type: "success",
  },
  {
    id: 2,
    message: "Product authenticity confirmed by blockchain ledger",
    date: "2024-10-28",
    read: false,
    type: "info",
  },
  {
    id: 3,
    message: "A new product category is available for verification",
    date: "2024-10-27",
    read: true,
    type: "info",
  },
  {
    id: 4,
    message: "Warning: Product FTF-2024-003 has data inconsistencies",
    date: "2024-10-20",
    read: true,
    type: "warning",
  },
];

const ConsumerDashboard = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const [currentProduct, setCurrentProduct] = useState(null);
  const [purchaseHistory, setPurchaseHistory] = useState(dummyProducts);
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [feedbacks, setFeedbacks] = useState([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [userProfile, setUserProfile] = useState({
    name: "Naved",
    email: "naved.kumar@email.com",
    location: "Bangalore, India",
    phone: "+91 98765 43210",
    notifications: true,
    darkMode: false,
  });

  const showToastMessage = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSearch = () => {
    if (productId.trim()) {
      const product = dummyProducts.find((p) => p.id === productId.trim());
      if (product) {
        setCurrentProduct(product);
        showToastMessage("Product found successfully!");
      } else {
        setCurrentProduct(null);
        showToastMessage("Product not found. Please check the ID.", "error");
      }
    }
  };

  const handleSubmitFeedback = () => {
    if (rating === 0) {
      showToastMessage("Please provide a rating", "error");
      return;
    }
    const newFeedback = {
      id: Date.now(),
      productId: currentProduct.id,
      productName: currentProduct.name,
      rating,
      comment: feedback,
      date: new Date().toISOString().split("T")[0],
    };
    setFeedbacks([...feedbacks, newFeedback]);
    showToastMessage("Thank you for your feedback!");
    setRating(0);
    setFeedback("");
  };

  const handleLogout = () => {
    showToastMessage("Logged out successfully!");
    setShowLogoutModal(false);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    showToastMessage("All notifications marked as read");
  };

  const deleteAllNotifications = () => {
    setNotifications([]);
    showToastMessage("All notifications deleted");
  };

  const filteredHistory =
    filterStatus === "all"
      ? purchaseHistory
      : purchaseHistory.filter(
          (p) => p.status.toLowerCase() === filterStatus.toLowerCase()
        );

  const unreadCount = notifications.filter((n) => !n.read).length;

  // DYNAMIC Monthly Purchases Calculation
  const getMonthlyPurchasesData = () => {
    const monthCounts = {};

    purchaseHistory.forEach((product) => {
      const date = new Date(product.purchaseDate);
      const monthYear = date.toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      });
      const month = date.toLocaleString("en-US", { month: "short" });

      if (!monthCounts[month]) {
        monthCounts[month] = {
          month: month,
          purchases: 0,
          date: date,
        };
      }
      monthCounts[month].purchases += 1;
    });

    // Sort by date
    const sortedData = Object.values(monthCounts).sort(
      (a, b) => a.date - b.date
    );

    // Assign colors
    const colors = [
      "#10b981",
      "#34d399",
      "#6ee7b7",
      "#a7f3d0",
      "#86efac",
      "#bbf7d0",
      "#059669",
      "#047857",
    ];

    return sortedData.map((item, index) => ({
      month: item.month,
      purchases: item.purchases,
      color: colors[index % colors.length],
    }));
  };

  // Dashboard Overview
  const DashboardView = () => {
    const monthlyData = getMonthlyPurchasesData();

    // Custom label renderer for pie chart
    const renderCustomLabel = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
    }) => {
      const RADIAN = Math.PI / 180;
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
          className="font-bold text-sm"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };

    // Custom tooltip
    const CustomTooltip = ({ active, payload }) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-white p-3 rounded-lg shadow-lg border-2 border-green-200">
            <p className="font-bold text-gray-800">
              {payload[0].payload.month}
            </p>
            <p className="text-green-600 font-semibold">
              Purchases: {payload[0].value}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {((payload[0].value / purchaseHistory.length) * 100).toFixed(1)}%
              of total
            </p>
          </div>
        );
      }
      return null;
    };

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">
            Welcome, {userProfile.name}! 🌿
          </h2>
          <p className="opacity-90">
            Track your farm-fresh products with complete transparency
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-3xl font-bold text-green-600">
                {purchaseHistory.length}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-gray-600">
              Total Products
            </h3>
            <p className="text-xs text-gray-500 mt-1">Purchased</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-3xl font-bold text-blue-600">
                {purchaseHistory.filter((p) => p.status === "Verified").length}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-gray-600">
              Products Verified
            </h3>
            <p className="text-xs text-gray-500 mt-1">Authentic</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-3xl font-bold text-purple-600">
                {purchaseHistory.length}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-gray-600">
              Traceability Checks
            </h3>
            <p className="text-xs text-gray-500 mt-1">Done</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Star className="h-6 w-6 text-orange-600" />
              </div>
              <span className="text-3xl font-bold text-orange-600">
                {purchaseHistory.length - feedbacks.length}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-gray-600">
              Pending Feedback
            </h3>
            <p className="text-xs text-gray-500 mt-1">To Submit</p>
          </div>
        </div>

        {/* RESPONSIVE PIE CHART - DYNAMIC DATA */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
            Monthly Purchases Trend
          </h3>

          {monthlyData.length > 0 ? (
            <>
              <div className="w-full h-80 sm:h-96 lg:h-[28rem]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={monthlyData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomLabel}
                      outerRadius="70%"
                      innerRadius="45%"
                      fill="#8884d8"
                      dataKey="purchases"
                      animationBegin={0}
                      animationDuration={800}
                    >
                      {monthlyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      formatter={(value, entry) =>
                        `${entry.payload.month} (${entry.payload.purchases} purchases)`
                      }
                      wrapperStyle={{
                        paddingTop: "20px",
                        fontSize: "14px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Summary Stats Below Chart */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6 pt-6 border-t border-gray-200">
                {monthlyData.map((data, index) => (
                  <div
                    key={index}
                    className="text-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div
                      className="w-4 h-4 rounded-full mx-auto mb-2"
                      style={{ backgroundColor: data.color }}
                    ></div>
                    <p className="text-sm font-bold text-gray-800">
                      {data.month}
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {data.purchases}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(
                        (data.purchases / purchaseHistory.length) *
                        100
                      ).toFixed(0)}
                      %
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No purchase data available</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Recent Verifications
            </h3>
            <div className="space-y-3">
              {purchaseHistory.slice(0, 3).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg ${
                        product.status === "Verified"
                          ? "bg-green-100"
                          : "bg-orange-100"
                      }`}
                    >
                      {product.status === "Verified" ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-orange-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {product.purchaseDate}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      product.status === "Verified"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => setCurrentView("verify")}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 flex items-center justify-center"
              >
                <Search className="h-5 w-5 mr-2" />
                Verify New Product
              </button>
              <button
                onClick={() => setCurrentView("history")}
                className="w-full bg-gray-100 text-gray-700 p-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                <History className="h-5 w-5 mr-2" />
                View Purchase History
              </button>
              <button
                onClick={() => setCurrentView("notifications")}
                className="w-full bg-gray-100 text-gray-700 p-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Check Notifications
                </div>
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Product Verification View
  const VerifyView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <Search className="h-7 w-7 mr-2 text-green-600" />
          Product Verification
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter Product ID (e.g., FTF-2024-001)"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
          />
          <button
            onClick={handleSearch}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 flex items-center justify-center"
          >
            <Search className="h-5 w-5 mr-2" />
            Search
          </button>
          <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center">
            <QrCode className="h-5 w-5 mr-2" />
            Scan QR
          </button>
        </div>
      </div>

      {currentProduct ? (
        <>
          {currentProduct.aiFlag && (
            <div className="bg-orange-100 border-l-4 border-orange-500 p-4 rounded-lg flex items-start">
              <AlertCircle className="h-6 w-6 text-orange-600 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-orange-800">
                  AI Anomaly Detection Alert
                </h4>
                <p className="text-sm text-orange-700">
                  This product has potential data inconsistencies. Please review
                  carefully.
                </p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Sprout className="h-7 w-7 mr-2 text-green-600" />
              Product Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <Sprout className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Product Name</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {currentProduct.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <Package className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {currentProduct.type}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <Calendar className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Harvest Date</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {currentProduct.harvestDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <Calendar className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Expiry Date</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {currentProduct.expiryDate}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <MapPin className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Origin</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {currentProduct.origin}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <Award className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Certification</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {currentProduct.certification}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Product Journey Timeline
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              <div
                className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-green-300 via-emerald-400 to-teal-400"
                style={{ width: "calc(100% - 8rem)", left: "4rem" }}
              ></div>

              {currentProduct.timeline.map((stage, index) => (
                <div key={index} className="relative">
                  <div
                    className={`rounded-xl p-4 border-2 transition-all transform hover:scale-105 hover:shadow-lg ${
                      stage.verified
                        ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:border-green-400"
                        : "bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 hover:border-orange-400"
                    }`}
                  >
                    <div className="flex justify-center mb-3">
                      <div
                        className={`p-3 rounded-full shadow-lg ${
                          stage.verified
                            ? "bg-gradient-to-br from-green-500 to-emerald-600"
                            : "bg-gradient-to-br from-orange-500 to-red-600"
                        }`}
                      >
                        {stage.verified ? (
                          <CheckCircle className="h-6 w-6 text-white" />
                        ) : (
                          <AlertCircle className="h-6 w-6 text-white" />
                        )}
                      </div>
                    </div>
                    <h3 className="font-bold text-center text-gray-800 mb-2">
                      {stage.stage}
                    </h3>
                    <p className="text-sm text-gray-600 text-center mb-1">
                      {stage.name}
                    </p>
                    <p className="text-xs text-gray-500 text-center flex items-center justify-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {stage.date}
                    </p>
                    <p className="text-xs text-gray-500 text-center flex items-center justify-center mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {stage.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white transform hover:shadow-xl transition-all hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Freshness Score</h3>
                <TrendingUp className="h-8 w-8" />
              </div>
              <div className="text-5xl font-bold mb-2">
                {currentProduct.freshnessScore}%
              </div>
              <div className="bg-white bg-opacity-20 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-white h-full rounded-full transition-all duration-500"
                  style={{ width: `${currentProduct.freshnessScore}%` }}
                ></div>
              </div>
              <p className="text-sm mt-3 opacity-90">
                {currentProduct.freshnessScore >= 90
                  ? "Excellent quality product"
                  : currentProduct.freshnessScore >= 75
                  ? "Good quality product"
                  : "Quality concerns detected"}
              </p>
            </div>

            <div
              className={`rounded-xl shadow-lg p-6 text-white transform hover:shadow-xl transition-all hover:scale-105 ${
                currentProduct.authenticity === "Pass"
                  ? "bg-gradient-to-br from-teal-500 to-cyan-600"
                  : "bg-gradient-to-br from-orange-500 to-red-600"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Authenticity Check</h3>
                {currentProduct.authenticity === "Pass" ? (
                  <CheckCircle className="h-8 w-8" />
                ) : (
                  <AlertCircle className="h-8 w-8" />
                )}
              </div>
              <div className="text-5xl font-bold mb-2">
                {currentProduct.authenticity}
              </div>
              <div className="flex items-center mt-4">
                {currentProduct.authenticity === "Pass" ? (
                  <CheckCircle className="h-6 w-6 mr-2" />
                ) : (
                  <AlertCircle className="h-6 w-6 mr-2" />
                )}
                <span className="text-lg">
                  {currentProduct.authenticity === "Pass"
                    ? "Verified Authentic"
                    : "Review Required"}
                </span>
              </div>
              <p className="text-sm mt-3 opacity-90">
                {currentProduct.authenticity === "Pass"
                  ? "All quality checks passed"
                  : "Data inconsistencies found"}
              </p>
            </div>
          </div>

          <div
            className="bg-white rounded-xl shadow-lg p-6"
            id="feedback-section"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Share Your Feedback
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Rate this product
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transform transition-transform hover:scale-125"
                    >
                      <Star
                        className={`h-10 w-10 ${
                          star <= (hoverRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        } transition-colors`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Comments
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your experience with this product..."
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <button
                onClick={handleSubmitFeedback}
                disabled={rating === 0}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl shadow-lg">
          <Search className="h-20 w-20 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-500">
            Enter a Product ID to view traceability details
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Try searching for: FTF-2024-001
          </p>
        </div>
      )}
    </div>
  );

  // Purchase History View
  const HistoryView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <History className="h-7 w-7 mr-2 text-green-600" />
            Purchase History
          </h2>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="flagged">Flagged</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredHistory.map((product) => (
            <div
              key={product.id}
              className="border-2 border-gray-200 rounded-xl p-4 hover:border-green-300 transition-all hover:shadow-md"
            >
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-800">
                      {product.name}
                    </h3>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        product.status === "Verified"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Package className="h-4 w-4 mr-2 text-green-600" />
                      <span className="font-semibold mr-1">ID:</span>{" "}
                      {product.id}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Sprout className="h-4 w-4 mr-2 text-green-600" />
                      <span className="font-semibold mr-1">Source:</span>{" "}
                      {product.farmer}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-green-600" />
                      <span className="font-semibold mr-1">Date:</span>{" "}
                      {product.purchaseDate}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
                      <span className="font-semibold mr-1">Score:</span>{" "}
                      {product.freshnessScore}%
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setCurrentProduct(product);
                      setCurrentView("verify");
                    }}
                    className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-green-200 transition-colors text-sm"
                  >
                    View Trace
                  </button>
                  <button
                    onClick={() => {
                      setCurrentProduct(product);
                      setCurrentView("verify");
                      setTimeout(() => {
                        document
                          .getElementById("feedback-section")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm"
                  >
                    Add Feedback
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredHistory.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No products found with this filter</p>
          </div>
        )}
      </div>

      {feedbacks.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Star className="h-6 w-6 mr-2 text-yellow-500" />
            My Feedback History
          </h3>
          <div className="space-y-3">
            {feedbacks.map((fb) => (
              <div
                key={fb.id}
                className="border-2 border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-800">
                    {fb.productName}
                  </h4>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= fb.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{fb.comment}</p>
                <p className="text-xs text-gray-500">{fb.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Notifications View
  const NotificationsView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Bell className="h-7 w-7 mr-2 text-green-600" />
            Notifications
            {unreadCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={markAllAsRead}
              className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-green-200 transition-colors text-sm"
            >
              Mark All Read
            </button>
            <button
              onClick={deleteAllNotifications}
              className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-semibold hover:bg-red-200 transition-colors text-sm"
            >
              Delete All
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`border-l-4 rounded-lg p-4 transition-all ${
                notif.type === "success"
                  ? "border-green-500 bg-green-50"
                  : notif.type === "warning"
                  ? "border-orange-500 bg-orange-50"
                  : "border-blue-500 bg-blue-50"
              } ${!notif.read ? "shadow-md" : "opacity-75"}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start flex-1">
                  {notif.type === "success" ? (
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                  ) : notif.type === "warning" ? (
                    <AlertCircle className="h-5 w-5 text-orange-600 mr-3 mt-0.5" />
                  ) : (
                    <Bell className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">{notif.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notif.date}</p>
                  </div>
                </div>
                {!notif.read && (
                  <span className="bg-red-500 h-2 w-2 rounded-full"></span>
                )}
              </div>
            </div>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No notifications</p>
          </div>
        )}
      </div>
    </div>
  );

  // Profile View
  const ProfileView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <User className="h-7 w-7 mr-2 text-green-600" />
          Profile & Settings
        </h2>

        <div className="space-y-6">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-full">
              <User className="h-20 w-20 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={userProfile.name}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, name: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={userProfile.email}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, email: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={userProfile.phone}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, phone: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={userProfile.location}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, location: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="border-t-2 border-gray-200 pt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-800">
                    Enable Notifications
                  </p>
                  <p className="text-sm text-gray-600">
                    Receive updates about your products
                  </p>
                </div>
                <button
                  onClick={() =>
                    setUserProfile({
                      ...userProfile,
                      notifications: !userProfile.notifications,
                    })
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    userProfile.notifications ? "bg-green-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      userProfile.notifications
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-800">Dark Mode</p>
                  <p className="text-sm text-gray-600">Enable dark theme</p>
                </div>
                <button
                  onClick={() =>
                    setUserProfile({
                      ...userProfile,
                      darkMode: !userProfile.darkMode,
                    })
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    userProfile.darkMode ? "bg-green-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      userProfile.darkMode ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => showToastMessage("Profile updated successfully!")}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-3 rounded-lg shadow-lg"
      >
        {sidebarOpen ? (
          <X className="h-6 w-6 text-gray-800" />
        ) : (
          <Menu className="h-6 w-6 text-gray-800" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6 bg-gradient-to-r from-green-600 to-emerald-600">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <Sprout className="h-8 w-8 mr-2" />
            FarmTrace
          </h1>
          <p className="text-green-100 text-sm mt-1">Consumer Portal</p>
        </div>

        <nav className="p-4 space-y-2">
          <button
            onClick={() => {
              setCurrentView("dashboard");
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold transition-all ${
              currentView === "dashboard"
                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Home className="h-5 w-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => {
              setCurrentView("verify");
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold transition-all ${
              currentView === "verify"
                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Search className="h-5 w-5" />
            <span>Verify Product</span>
          </button>

          <button
            onClick={() => {
              setCurrentView("history");
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold transition-all ${
              currentView === "history"
                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <History className="h-5 w-5" />
            <span>Purchase History</span>
          </button>

          <button
            onClick={() => {
              setCurrentView("notifications");
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold transition-all ${
              currentView === "notifications"
                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </div>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setCurrentView("profile");
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold transition-all ${
              currentView === "profile"
                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8">
        {currentView === "dashboard" && <DashboardView />}
        {currentView === "verify" && <VerifyView />}
        {currentView === "history" && <HistoryView />}
        {currentView === "notifications" && <NotificationsView />}
        {currentView === "profile" && <ProfileView />}
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Confirm Logout
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout from your account?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
          <div
            className={`rounded-lg shadow-2xl p-4 flex items-center space-x-3 ${
              toastType === "success" ? "bg-green-600" : "bg-red-600"
            } text-white`}
          >
            {toastType === "success" ? (
              <CheckCircle className="h-6 w-6" />
            ) : (
              <AlertCircle className="h-6 w-6" />
            )}
            <span className="font-semibold">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default ConsumerDashboard;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Search, QrCode, MapPin, Calendar, CheckCircle, AlertCircle, Star, User, LogOut, Sprout, TrendingUp, Home, History, Bell, Settings, Package, Award, Filter, X, Menu } from 'lucide-react';

// // Dummy data
// const dummyProducts = [
//   {
//     id: 'FTF-2024-001',
//     name: 'Organic Basmati Rice',
//     type: 'Rice',
//     harvestDate: '2024-10-15',
//     expiryDate: '2025-10-15',
//     origin: 'Punjab, India',
//     status: 'Verified',
//     freshnessScore: 95,
//     authenticity: 'Pass',
//     aiFlag: false,
//     farmer: 'Green Valley Farms',
//     farmerLocation: 'Punjab, India',
//     distributor: 'AgriConnect Logistics',
//     retailer: 'Fresh Mart Store',
//     certification: 'Organic Certified',
//     purchaseDate: '2024-10-25',
//     timeline: [
//       { stage: 'Farmer', name: 'Green Valley Farms', date: '2024-10-15', location: 'Punjab, India', verified: true },
//       { stage: 'Distributor', name: 'AgriConnect Logistics', date: '2024-10-18', location: 'Mumbai, India', verified: true },
//       { stage: 'Retailer', name: 'Fresh Mart Store', date: '2024-10-22', location: 'Bangalore, India', verified: true },
//       { stage: 'Consumer', name: 'You', date: '2024-10-25', location: 'Bangalore, India', verified: true }
//     ]
//   },
//   {
//     id: 'FTF-2024-002',
//     name: 'Fresh Tomatoes',
//     type: 'Vegetable',
//     harvestDate: '2024-10-28',
//     expiryDate: '2024-11-05',
//     origin: 'Karnataka, India',
//     status: 'Verified',
//     freshnessScore: 92,
//     authenticity: 'Pass',
//     aiFlag: false,
//     farmer: 'Sunrise Organic Farm',
//     farmerLocation: 'Karnataka, India',
//     distributor: 'Fresh Logistics Co.',
//     retailer: 'Green Grocer',
//     certification: 'Pesticide Free',
//     purchaseDate: '2024-10-29',
//     timeline: [
//       { stage: 'Farmer', name: 'Sunrise Organic Farm', date: '2024-10-28', location: 'Karnataka, India', verified: true },
//       { stage: 'Distributor', name: 'Fresh Logistics Co.', date: '2024-10-28', location: 'Bangalore, India', verified: true },
//       { stage: 'Retailer', name: 'Green Grocer', date: '2024-10-29', location: 'Bangalore, India', verified: true },
//       { stage: 'Consumer', name: 'You', date: '2024-10-29', location: 'Bangalore, India', verified: true }
//     ]
//   },
//   {
//     id: 'FTF-2024-003',
//     name: 'Wheat Flour',
//     type: 'Grain',
//     harvestDate: '2024-09-20',
//     expiryDate: '2025-03-20',
//     origin: 'Haryana, India',
//     status: 'Flagged',
//     freshnessScore: 78,
//     authenticity: 'Warning',
//     aiFlag: true,
//     farmer: 'Golden Fields Farm',
//     farmerLocation: 'Haryana, India',
//     distributor: 'AgriTrans Network',
//     retailer: 'Super Mart',
//     certification: 'Standard Quality',
//     purchaseDate: '2024-10-20',
//     timeline: [
//       { stage: 'Farmer', name: 'Golden Fields Farm', date: '2024-09-20', location: 'Haryana, India', verified: true },
//       { stage: 'Distributor', name: 'AgriTrans Network', date: '2024-09-25', location: 'Delhi, India', verified: false },
//       { stage: 'Retailer', name: 'Super Mart', date: '2024-10-15', location: 'Bangalore, India', verified: true },
//       { stage: 'Consumer', name: 'You', date: '2024-10-20', location: 'Bangalore, India', verified: true }
//     ]
//   }
// ];

// const dummyNotifications = [
//   { id: 1, message: 'Your product trace verification was successful', date: '2024-10-29', read: false, type: 'success' },
//   { id: 2, message: 'Product authenticity confirmed by blockchain ledger', date: '2024-10-28', read: false, type: 'info' },
//   { id: 3, message: 'A new product category is available for verification', date: '2024-10-27', read: true, type: 'info' },
//   { id: 4, message: 'Warning: Product FTF-2024-003 has data inconsistencies', date: '2024-10-20', read: true, type: 'warning' }
// ];

// const ConsumerDashboard = () => {
//   const navigate = useNavigate();
//   const [currentView, setCurrentView] = useState('dashboard');
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [productId, setProductId] = useState('');
//   const [currentProduct, setCurrentProduct] = useState(null);
//   const [purchaseHistory, setPurchaseHistory] = useState(dummyProducts);
//   const [notifications, setNotifications] = useState(dummyNotifications);
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [rating, setRating] = useState(0);
//   const [hoverRating, setHoverRating] = useState(0);
//   const [feedback, setFeedback] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState('');
//   const [toastType, setToastType] = useState('success');
//   const [userProfile, setUserProfile] = useState({
//     name: 'Naved',
//     email: 'naved.kumar@email.com',
//     location: 'Bangalore, India',
//     phone: '+91 98765 43210',
//     notifications: true,
//     darkMode: false
//   });

//   const showToastMessage = (message, type = 'success') => {
//     setToastMessage(message);
//     setToastType(type);
//     setShowToast(true);
//     setTimeout(() => setShowToast(false), 3000);
//   };

//   const handleSearch = () => {
//     if (productId.trim()) {
//       const product = dummyProducts.find(p => p.id === productId.trim());
//       if (product) {
//         setCurrentProduct(product);
//         showToastMessage('Product found successfully!');
//       } else {
//         setCurrentProduct(null);
//         showToastMessage('Product not found. Please check the ID.', 'error');
//       }
//     }
//   };

//   const handleSubmitFeedback = () => {
//     if (rating === 0) {
//       showToastMessage('Please provide a rating', 'error');
//       return;
//     }
//     const newFeedback = {
//       id: Date.now(),
//       productId: currentProduct.id,
//       productName: currentProduct.name,
//       rating,
//       comment: feedback,
//       date: new Date().toISOString().split('T')[0]
//     };
//     setFeedbacks([...feedbacks, newFeedback]);
//     showToastMessage('Thank you for your feedback!');
//     setRating(0);
//     setFeedback('');
//   };

//   const handleLogout = () => {
//     showToastMessage('Logged out successfully!');
//     setShowLogoutModal(false);
//     setTimeout(() => {
//       navigate('/');
//     }, 1000);
//   };

//   const markAllAsRead = () => {
//     setNotifications(notifications.map(n => ({ ...n, read: true })));
//     showToastMessage('All notifications marked as read');
//   };

//   const deleteAllNotifications = () => {
//     setNotifications([]);
//     showToastMessage('All notifications deleted');
//   };

//   const filteredHistory = filterStatus === 'all'
//     ? purchaseHistory
//     : purchaseHistory.filter(p => p.status.toLowerCase() === filterStatus.toLowerCase());

//   const unreadCount = notifications.filter(n => !n.read).length;

//   // Dashboard Overview
//   const DashboardView = () => {
//     const monthlyData = [
//       { month: 'Jul', purchases: 4 },
//       { month: 'Aug', purchases: 6 },
//       { month: 'Sep', purchases: 8 },
//       { month: 'Oct', purchases: 12 }
//     ];

//     return (
//       <div className="space-y-6">
//         <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
//           <h2 className="text-2xl font-bold mb-2">Welcome, {userProfile.name}! 🌿</h2>
//           <p className="opacity-90">Track your farm-fresh products with complete transparency</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all">
//             <div className="flex items-center justify-between mb-4">
//               <div className="bg-green-100 p-3 rounded-lg">
//                 <Package className="h-6 w-6 text-green-600" />
//               </div>
//               <span className="text-3xl font-bold text-green-600">{purchaseHistory.length}</span>
//             </div>
//             <h3 className="text-sm font-semibold text-gray-600">Total Products</h3>
//             <p className="text-xs text-gray-500 mt-1">Purchased</p>
//           </div>

//           <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all">
//             <div className="flex items-center justify-between mb-4">
//               <div className="bg-blue-100 p-3 rounded-lg">
//                 <CheckCircle className="h-6 w-6 text-blue-600" />
//               </div>
//               <span className="text-3xl font-bold text-blue-600">
//                 {purchaseHistory.filter(p => p.status === 'Verified').length}
//               </span>
//             </div>
//             <h3 className="text-sm font-semibold text-gray-600">Products Verified</h3>
//             <p className="text-xs text-gray-500 mt-1">Authentic</p>
//           </div>

//           <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all">
//             <div className="flex items-center justify-between mb-4">
//               <div className="bg-purple-100 p-3 rounded-lg">
//                 <Award className="h-6 w-6 text-purple-600" />
//               </div>
//               <span className="text-3xl font-bold text-purple-600">{purchaseHistory.length}</span>
//             </div>
//             <h3 className="text-sm font-semibold text-gray-600">Traceability Checks</h3>
//             <p className="text-xs text-gray-500 mt-1">Done</p>
//           </div>

//           <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all">
//             <div className="flex items-center justify-between mb-4">
//               <div className="bg-orange-100 p-3 rounded-lg">
//                 <Star className="h-6 w-6 text-orange-600" />
//               </div>
//               <span className="text-3xl font-bold text-orange-600">
//                 {purchaseHistory.length - feedbacks.length}
//               </span>
//             </div>
//             <h3 className="text-sm font-semibold text-gray-600">Pending Feedback</h3>
//             <p className="text-xs text-gray-500 mt-1">To Submit</p>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h3 className="text-xl font-bold text-gray-800 mb-6">Monthly Purchases Trend</h3>
//           <div className="flex items-end justify-between h-48 gap-4">
//             {monthlyData.map((data, index) => (
//               <div key={index} className="flex-1 flex flex-col items-center">
//                 <div className="w-full bg-gradient-to-t from-green-500 to-emerald-400 rounded-t-lg transition-all hover:from-green-600 hover:to-emerald-500"
//                      style={{ height: `${(data.purchases / 12) * 100}%` }}>
//                 </div>
//                 <span className="text-2xl font-bold text-green-600 mt-2">{data.purchases}</span>
//                 <span className="text-sm text-gray-600 mt-1">{data.month}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Verifications</h3>
//             <div className="space-y-3">
//               {purchaseHistory.slice(0, 3).map((product) => (
//                 <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//                   <div className="flex items-center space-x-3">
//                     <div className={`p-2 rounded-lg ${product.status === 'Verified' ? 'bg-green-100' : 'bg-orange-100'}`}>
//                       {product.status === 'Verified' ?
//                         <CheckCircle className="h-5 w-5 text-green-600" /> :
//                         <AlertCircle className="h-5 w-5 text-orange-600" />
//                       }
//                     </div>
//                     <div>
//                       <p className="font-semibold text-gray-800">{product.name}</p>
//                       <p className="text-xs text-gray-500">{product.purchaseDate}</p>
//                     </div>
//                   </div>
//                   <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
//                     product.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
//                   }`}>
//                     {product.status}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
//             <div className="space-y-3">
//               <button
//                 onClick={() => setCurrentView('verify')}
//                 className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 flex items-center justify-center"
//               >
//                 <Search className="h-5 w-5 mr-2" />
//                 Verify New Product
//               </button>
//               <button
//                 onClick={() => setCurrentView('history')}
//                 className="w-full bg-gray-100 text-gray-700 p-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center"
//               >
//                 <History className="h-5 w-5 mr-2" />
//                 View Purchase History
//               </button>
//               <button
//                 onClick={() => setCurrentView('notifications')}
//                 className="w-full bg-gray-100 text-gray-700 p-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-between"
//               >
//                 <div className="flex items-center">
//                   <Bell className="h-5 w-5 mr-2" />
//                   Check Notifications
//                 </div>
//                 {unreadCount > 0 && (
//                   <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">{unreadCount}</span>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Product Verification View
//   const VerifyView = () => (
//     <div className="space-y-6">
//       <div className="bg-white rounded-xl shadow-lg p-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
//           <Search className="h-7 w-7 mr-2 text-green-600" />
//           Product Verification
//         </h2>
//         <div className="flex flex-col sm:flex-row gap-4">
//           <input
//             type="text"
//             placeholder="Enter Product ID (e.g., FTF-2024-001)"
//             value={productId}
//             onChange={(e) => setProductId(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//             className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
//           />
//           <button
//             onClick={handleSearch}
//             className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 flex items-center justify-center"
//           >
//             <Search className="h-5 w-5 mr-2" />
//             Search
//           </button>
//           <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center">
//             <QrCode className="h-5 w-5 mr-2" />
//             Scan QR
//           </button>
//         </div>
//       </div>

//       {currentProduct ? (
//         <>
//           {currentProduct.aiFlag && (
//             <div className="bg-orange-100 border-l-4 border-orange-500 p-4 rounded-lg flex items-start">
//               <AlertCircle className="h-6 w-6 text-orange-600 mr-3 flex-shrink-0" />
//               <div>
//                 <h4 className="font-bold text-orange-800">AI Anomaly Detection Alert</h4>
//                 <p className="text-sm text-orange-700">This product has potential data inconsistencies. Please review carefully.</p>
//               </div>
//             </div>
//           )}

//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
//               <Sprout className="h-7 w-7 mr-2 text-green-600" />
//               Product Details
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div className="space-y-4">
//                 <div className="flex items-start">
//                   <div className="bg-green-100 p-2 rounded-lg mr-3">
//                     <Sprout className="h-5 w-5 text-green-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Product Name</p>
//                     <p className="text-lg font-semibold text-gray-800">{currentProduct.name}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <div className="bg-green-100 p-2 rounded-lg mr-3">
//                     <Package className="h-5 w-5 text-green-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Type</p>
//                     <p className="text-lg font-semibold text-gray-800">{currentProduct.type}</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="space-y-4">
//                 <div className="flex items-start">
//                   <div className="bg-green-100 p-2 rounded-lg mr-3">
//                     <Calendar className="h-5 w-5 text-green-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Harvest Date</p>
//                     <p className="text-lg font-semibold text-gray-800">{currentProduct.harvestDate}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <div className="bg-green-100 p-2 rounded-lg mr-3">
//                     <Calendar className="h-5 w-5 text-green-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Expiry Date</p>
//                     <p className="text-lg font-semibold text-gray-800">{currentProduct.expiryDate}</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="space-y-4">
//                 <div className="flex items-start">
//                   <div className="bg-green-100 p-2 rounded-lg mr-3">
//                     <MapPin className="h-5 w-5 text-green-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Origin</p>
//                     <p className="text-lg font-semibold text-gray-800">{currentProduct.origin}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <div className="bg-green-100 p-2 rounded-lg mr-3">
//                     <Award className="h-5 w-5 text-green-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Certification</p>
//                     <p className="text-lg font-semibold text-gray-800">{currentProduct.certification}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Journey Timeline</h2>
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
//               <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-green-300 via-emerald-400 to-teal-400" style={{ width: 'calc(100% - 8rem)', left: '4rem' }}></div>

//               {currentProduct.timeline.map((stage, index) => (
//                 <div key={index} className="relative">
//                   <div className={`rounded-xl p-4 border-2 transition-all transform hover:scale-105 hover:shadow-lg ${
//                     stage.verified ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:border-green-400' : 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 hover:border-orange-400'
//                   }`}>
//                     <div className="flex justify-center mb-3">
//                       <div className={`p-3 rounded-full shadow-lg ${
//                         stage.verified ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gradient-to-br from-orange-500 to-red-600'
//                       }`}>
//                         {stage.verified ?
//                           <CheckCircle className="h-6 w-6 text-white" /> :
//                           <AlertCircle className="h-6 w-6 text-white" />
//                         }
//                       </div>
//                     </div>
//                     <h3 className="font-bold text-center text-gray-800 mb-2">{stage.stage}</h3>
//                     <p className="text-sm text-gray-600 text-center mb-1">{stage.name}</p>
//                     <p className="text-xs text-gray-500 text-center flex items-center justify-center">
//                       <Calendar className="h-3 w-3 mr-1" />
//                       {stage.date}
//                     </p>
//                     <p className="text-xs text-gray-500 text-center flex items-center justify-center mt-1">
//                       <MapPin className="h-3 w-3 mr-1" />
//                       {stage.location}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white transform hover:shadow-xl transition-all hover:scale-105">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-xl font-bold">Freshness Score</h3>
//                 <TrendingUp className="h-8 w-8" />
//               </div>
//               <div className="text-5xl font-bold mb-2">{currentProduct.freshnessScore}%</div>
//               <div className="bg-white bg-opacity-20 rounded-full h-3 overflow-hidden">
//                 <div
//                   className="bg-white h-full rounded-full transition-all duration-500"
//                   style={{ width: `${currentProduct.freshnessScore}%` }}
//                 ></div>
//               </div>
//               <p className="text-sm mt-3 opacity-90">
//                 {currentProduct.freshnessScore >= 90 ? 'Excellent quality product' :
//                  currentProduct.freshnessScore >= 75 ? 'Good quality product' :
//                  'Quality concerns detected'}
//               </p>
//             </div>

//             <div className={`rounded-xl shadow-lg p-6 text-white transform hover:shadow-xl transition-all hover:scale-105 ${
//               currentProduct.authenticity === 'Pass' ? 'bg-gradient-to-br from-teal-500 to-cyan-600' : 'bg-gradient-to-br from-orange-500 to-red-600'
//             }`}>
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-xl font-bold">Authenticity Check</h3>
//                 {currentProduct.authenticity === 'Pass' ?
//                   <CheckCircle className="h-8 w-8" /> :
//                   <AlertCircle className="h-8 w-8" />
//                 }
//               </div>
//               <div className="text-5xl font-bold mb-2">{currentProduct.authenticity}</div>
//               <div className="flex items-center mt-4">
//                 {currentProduct.authenticity === 'Pass' ?
//                   <CheckCircle className="h-6 w-6 mr-2" /> :
//                   <AlertCircle className="h-6 w-6 mr-2" />
//                 }
//                 <span className="text-lg">
//                   {currentProduct.authenticity === 'Pass' ? 'Verified Authentic' : 'Review Required'}
//                 </span>
//               </div>
//               <p className="text-sm mt-3 opacity-90">
//                 {currentProduct.authenticity === 'Pass' ? 'All quality checks passed' : 'Data inconsistencies found'}
//               </p>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Share Your Feedback</h2>
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-3">Rate this product</label>
//                 <div className="flex space-x-2">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <button
//                       key={star}
//                       onClick={() => setRating(star)}
//                       onMouseEnter={() => setHoverRating(star)}
//                       onMouseLeave={() => setHoverRating(0)}
//                       className="transform transition-transform hover:scale-125"
//                     >
//                       <Star
//                         className={`h-10 w-10 ${
//                           star <= (hoverRating || rating)
//                             ? 'fill-yellow-400 text-yellow-400'
//                             : 'text-gray-300'
//                         } transition-colors`}
//                       />
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Your Comments</label>
//                 <textarea
//                   value={feedback}
//                   onChange={(e) => setFeedback(e.target.value)}
//                   placeholder="Share your experience with this product..."
//                   rows="4"
//                   className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors resize-none"
//                 ></textarea>
//               </div>

//               <button
//                 onClick={handleSubmitFeedback}
//                 disabled={rating === 0}
//                 className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//               >
//                 Submit Feedback
//               </button>
//             </div>
//           </div>
//         </>
//       ) : (
//         <div className="text-center py-16 bg-white rounded-xl shadow-lg">
//           <Search className="h-20 w-20 text-gray-300 mx-auto mb-4" />
//           <p className="text-xl text-gray-500">Enter a Product ID to view traceability details</p>
//           <p className="text-sm text-gray-400 mt-2">Try searching for: FTF-2024-001</p>
//         </div>
//       )}
//     </div>
//   );

//   // Purchase History View
//   const HistoryView = () => (
//     <div className="space-y-6">
//       <div className="bg-white rounded-xl shadow-lg p-6">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//           <h2 className="text-2xl font-bold text-gray-800 flex items-center">
//             <History className="h-7 w-7 mr-2 text-green-600" />
//             Purchase History
//           </h2>
//           <div className="flex items-center gap-2">
//             <Filter className="h-5 w-5 text-gray-600" />
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
//             >
//               <option value="all">All Status</option>
//               <option value="verified">Verified</option>
//               <option value="flagged">Flagged</option>
//             </select>
//           </div>
//         </div>

//         <div className="space-y-4">
//           {filteredHistory.map((product) => (
//             <div key={product.id} className="border-2 border-gray-200 rounded-xl p-4 hover:border-green-300 transition-all hover:shadow-md">
//               <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-2">
//                     <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
//                     <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
//                       product.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
//                     }`}>
//                       {product.status}
//                     </span>
//                   </div>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
//                     <div className="flex items-center text-gray-600">
//                       <Package className="h-4 w-4 mr-2 text-green-600" />
//                       <span className="font-semibold mr-1">ID:</span> {product.id}
//                     </div>
//                     <div className="flex items-center text-gray-600">
//                       <Sprout className="h-4 w-4 mr-2 text-green-600" />
//                       <span className="font-semibold mr-1">Source:</span> {product.farmer}
//                     </div>
//                     <div className="flex items-center text-gray-600">
//                       <Calendar className="h-4 w-4 mr-2 text-green-600" />
//                       <span className="font-semibold mr-1">Date:</span> {product.purchaseDate}
//                     </div>
//                     <div className="flex items-center text-gray-600">
//                       <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
//                       <span className="font-semibold mr-1">Score:</span> {product.freshnessScore}%
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => {
//                       setCurrentProduct(product);
//                       setCurrentView('verify');
//                     }}
//                     className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-green-200 transition-colors text-sm"
//                   >
//                     View Trace
//                   </button>
//                   <button
//                     onClick={() => {
//                       setCurrentProduct(product);
//                       setCurrentView('verify');
//                       setTimeout(() => {
//                         document.getElementById('feedback-section')?.scrollIntoView({ behavior: 'smooth' });
//                       }, 100);
//                     }}
//                     className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm"
//                   >
//                     Re-verify
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {filteredHistory.length === 0 && (
//           <div className="text-center py-12">
//             <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//             <p className="text-gray-500">No products found with this filter</p>
//           </div>
//         )}
//       </div>

//       {feedbacks.length > 0 && (
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
//             <Star className="h-6 w-6 mr-2 text-yellow-500" />
//             My Feedback History
//           </h3>
//           <div className="space-y-3">
//             {feedbacks.map((fb) => (
//               <div key={fb.id} className="border-2 border-gray-200 rounded-lg p-4">
//                 <div className="flex justify-between items-start mb-2">
//                   <h4 className="font-semibold text-gray-800">{fb.productName}</h4>
//                   <div className="flex">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <Star
//                         key={star}
//                         className={`h-4 w-4 ${star <= fb.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
//                       />
//                     ))}
//                   </div>
//                 </div>
//                 <p className="text-sm text-gray-600 mb-2">{fb.comment}</p>
//                 <p className="text-xs text-gray-500">{fb.date}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   // Notifications View
//   const NotificationsView = () => (
//     <div className="space-y-6">
//       <div className="bg-white rounded-xl shadow-lg p-6">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//           <h2 className="text-2xl font-bold text-gray-800 flex items-center">
//             <Bell className="h-7 w-7 mr-2 text-green-600" />
//             Notifications
//             {unreadCount > 0 && (
//               <span className="ml-2 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full">{unreadCount}</span>
//             )}
//           </h2>
//           <div className="flex gap-2">
//             <button
//               onClick={markAllAsRead}
//               className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-green-200 transition-colors text-sm"
//             >
//               Mark All Read
//             </button>
//             <button
//               onClick={deleteAllNotifications}
//               className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-semibold hover:bg-red-200 transition-colors text-sm"
//             >
//               Delete All
//             </button>
//           </div>
//         </div>

//         <div className="space-y-3">
//           {notifications.map((notif) => (
//             <div
//               key={notif.id}
//               className={`border-l-4 rounded-lg p-4 transition-all ${
//                 notif.type === 'success' ? 'border-green-500 bg-green-50' :
//                 notif.type === 'warning' ? 'border-orange-500 bg-orange-50' :
//                 'border-blue-500 bg-blue-50'
//               } ${!notif.read ? 'shadow-md' : 'opacity-75'}`}
//             >
//               <div className="flex items-start justify-between">
//                 <div className="flex items-start flex-1">
//                   {notif.type === 'success' ? <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" /> :
//                    notif.type === 'warning' ? <AlertCircle className="h-5 w-5 text-orange-600 mr-3 mt-0.5" /> :
//                    <Bell className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />}
//                   <div className="flex-1">
//                     <p className="text-gray-800 font-medium">{notif.message}</p>
//                     <p className="text-xs text-gray-500 mt-1">{notif.date}</p>
//                   </div>
//                 </div>
//                 {!notif.read && (
//                   <span className="bg-red-500 h-2 w-2 rounded-full"></span>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {notifications.length === 0 && (
//           <div className="text-center py-12">
//             <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//             <p className="text-gray-500">No notifications</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   // Profile View
//   const ProfileView = () => (
//     <div className="space-y-6">
//       <div className="bg-white rounded-xl shadow-lg p-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
//           <User className="h-7 w-7 mr-2 text-green-600" />
//           Profile & Settings
//         </h2>

//         <div className="space-y-6">
//           <div className="flex items-center justify-center mb-6">
//             <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-full">
//               <User className="h-20 w-20 text-white" />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
//               <input
//                 type="text"
//                 value={userProfile.name}
//                 onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
//               <input
//                 type="email"
//                 value={userProfile.email}
//                 onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
//               <input
//                 type="tel"
//                 value={userProfile.phone}
//                 onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
//               <input
//                 type="text"
//                 value={userProfile.location}
//                 onChange={(e) => setUserProfile({...userProfile, location: e.target.value})}
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
//               />
//             </div>
//           </div>

//           <div className="border-t-2 border-gray-200 pt-6">
//             <h3 className="text-lg font-bold text-gray-800 mb-4">Preferences</h3>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                 <div>
//                   <p className="font-semibold text-gray-800">Enable Notifications</p>
//                   <p className="text-sm text-gray-600">Receive updates about your products</p>
//                 </div>
//                 <button
//                   onClick={() => setUserProfile({...userProfile, notifications: !userProfile.notifications})}
//                   className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                     userProfile.notifications ? 'bg-green-600' : 'bg-gray-300'
//                   }`}
//                 >
//                   <span
//                     className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                       userProfile.notifications ? 'translate-x-6' : 'translate-x-1'
//                     }`}
//                   />
//                 </button>
//               </div>

//               <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                 <div>
//                   <p className="font-semibold text-gray-800">Dark Mode</p>
//                   <p className="text-sm text-gray-600">Switch to dark theme</p>
//                 </div>
//                 <button
//                   onClick={() => setUserProfile({...userProfile, darkMode: !userProfile.darkMode})}
//                   className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                     userProfile.darkMode ? 'bg-green-600' : 'bg-gray-300'
//                   }`}
//                 >
//                   <span
//                     className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                       userProfile.darkMode ? 'translate-x-6' : 'translate-x-1'
//                     }`}
//                   />
//                 </button>
//               </div>
//             </div>
//           </div>

//           <button
//             onClick={() => showToastMessage('Profile updated successfully!')}
//             className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105"
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   // Sidebar Navigation
//   const Sidebar = () => (
//     <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 lg:translate-x-0 ${
//       sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//     }`}>
//       <div className="flex flex-col h-full">
//         <div className="p-6 bg-gradient-to-r from-green-600 to-emerald-600">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <Sprout className="h-8 w-8 text-white" />
//               <h1 className="text-xl font-bold text-white">Farm-to-Fork</h1>
//             </div>
//             <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white">
//               <X className="h-6 w-6" />
//             </button>
//           </div>
//         </div>

//         <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
//           <button
//             onClick={() => { setCurrentView('dashboard'); setSidebarOpen(false); }}
//             className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold transition-all ${
//               currentView === 'dashboard' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'
//             }`}
//           >
//             <Home className="h-5 w-5" />
//             <span>Dashboard</span>
//           </button>

//           <button
//             onClick={() => { setCurrentView('verify'); setSidebarOpen(false); }}
//             className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold transition-all ${
//               currentView === 'verify' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'
//             }`}
//           >
//             <Search className="h-5 w-5" />
//             <span>Verify Product</span>
//           </button>

//           <button
//             onClick={() => { setCurrentView('history'); setSidebarOpen(false); }}
//             className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold transition-all ${
//               currentView === 'history' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'
//             }`}
//           >
//             <History className="h-5 w-5" />
//             <span>Purchase History</span>
//           </button>

//           <button
//             onClick={() => { setCurrentView('notifications'); setSidebarOpen(false); }}
//             className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold transition-all ${
//               currentView === 'notifications' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'
//             }`}
//           >
//             <div className="flex items-center space-x-3">
//               <Bell className="h-5 w-5" />
//               <span>Notifications</span>
//             </div>
//             {unreadCount > 0 && (
//               <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">{unreadCount}</span>
//             )}
//           </button>

//           <button
//             onClick={() => { setCurrentView('profile'); setSidebarOpen(false); }}
//             className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold transition-all ${
//               currentView === 'profile' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'
//             }`}
//           >
//             <Settings className="h-5 w-5" />
//             <span>Profile & Settings</span>
//           </button>
//         </nav>

//         <div className="p-4 border-t-2 border-gray-200">
//                 <button
//                   onClick={() => navigate('/')}
//                   className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold text-red-600 hover:bg-red-50 transition-all"
//                 >
//                   <LogOut className="h-5 w-5" />
//                   <span>Logout</span>
//                 </button>
//         </div>
//       </div>
//     </aside>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
//       <Sidebar />

//       {/* Mobile overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         ></div>
//       )}

//       {/* Main content */}
//       <div className="lg:ml-64">
//         {/* Top navbar */}
//         <nav className="bg-white shadow-md sticky top-0 z-30">
//           <div className="px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center h-16">
//               <button
//                 onClick={() => setSidebarOpen(true)}
//                 className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
//               >
//                 <Menu className="h-6 w-6 text-gray-700" />
//               </button>
//               <h2 className="text-xl font-bold text-gray-800">
//                 {currentView === 'dashboard' && 'Dashboard Overview'}
//                 {currentView === 'verify' && 'Product Verification'}
//                 {currentView === 'history' && 'Purchase History'}
//                 {currentView === 'notifications' && 'Notifications'}
//                 {currentView === 'profile' && 'Profile & Settings'}
//               </h2>
//               <div className="flex items-center space-x-4">
//                 <button
//                   onClick={() => setCurrentView('notifications')}
//                   className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
//                 >
//                   <Bell className="h-6 w-6 text-gray-700" />
//                   {unreadCount > 0 && (
//                     <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//                       {unreadCount}
//                     </span>
//                   )}
//                 </button>
//                 <button
//                   onClick={() => setCurrentView('profile')}
//                   className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//                 >
//                   <User className="h-6 w-6 text-gray-700" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </nav>

//         {/* Page content */}
//         <main className="p-4 sm:p-6 lg:p-8">
//           {currentView === 'dashboard' && <DashboardView />}
//           {currentView === 'verify' && <VerifyView />}
//           {currentView === 'history' && <HistoryView />}
//           {currentView === 'notifications' && <NotificationsView />}
//           {currentView === 'profile' && <ProfileView />}
//         </main>
//       </div>

//       {/* Logout Modal */}
//       {showLogoutModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Logout</h3>
//             <p className="text-gray-600 mb-6">Are you sure you want to logout from your account?</p>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowLogoutModal(false)}
//                 className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Toast Notification */}
//       {showToast && (
//         <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
//           <div className={`rounded-lg shadow-lg p-4 flex items-center space-x-3 ${
//             toastType === 'success' ? 'bg-green-600' :
//             toastType === 'error' ? 'bg-red-600' : 'bg-blue-600'
//           } text-white`}>
//             {toastType === 'success' && <CheckCircle className="h-5 w-5" />}
//             {toastType === 'error' && <AlertCircle className="h-5 w-5" />}
//             {toastType === 'info' && <Bell className="h-5 w-5" />}
//             <span className="font-semibold">{toastMessage}</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ConsumerDashboard;
