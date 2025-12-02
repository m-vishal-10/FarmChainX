import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

// Import Retailer API functions
import {
  retailerGetShipments,
  retailerAcceptShipment,
} from "../api/retailerApi";

const RetailerDashboard = ({ userRole, setUserRole }) => {
  const navigate = useNavigate();

  const [deliveries, setDeliveries] = useState([]);

  // Load shipments when dashboard opens
  useEffect(() => {
    loadShipments();
  }, []);

  const loadShipments = async () => {
    try {
      const res = await retailerGetShipments();
      setDeliveries(res.data);
    } catch (err) {
      console.error("Error loading shipments", err);
    }
  };

  const acceptDelivery = async (id) => {
    try {
      await retailerAcceptShipment(id);
      loadShipments(); // refresh after accepting
    } catch (err) {
      console.error("Error accepting delivery", err);
    }
  };

  return (
    <div className="flex">
      <Sidebar userRole={userRole} />
      <div className="flex-1">
        <Navbar userRole={userRole} setUserRole={setUserRole} />

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Retailer Dashboard</h1>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Deliveries</h2>

            <div className="space-y-4">
              {deliveries.length === 0 ? (
                <p className="text-gray-600">No deliveries available.</p>
              ) : (
                deliveries.map((delivery) => (
                  <div
                    key={delivery.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded"
                  >
                    <div>
                      <p className="font-semibold">{delivery.productName}</p>
                      <p className="text-gray-600">
                        Quantity: {delivery.quantity}
                      </p>
                      <p className="text-gray-600">
                        Status:{" "}
                        <span className="font-medium">{delivery.status}</span>
                      </p>
                    </div>

                    {delivery.status === "Pending" && (
                      <button
                        onClick={() => acceptDelivery(delivery.id)}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                      >
                        Accept
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailerDashboard;
