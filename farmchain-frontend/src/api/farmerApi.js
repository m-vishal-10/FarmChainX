import api from "../apiClient";

export const farmerAddProduct = (product) =>
  api.post("/api/farmer/products", product, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

export const farmerGetProducts = () =>
  api.get("/api/farmer/products", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
