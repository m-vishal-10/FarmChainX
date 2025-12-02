import api from "../apiClient";

// Create a new product for the logged-in farmer
export const farmerAddProduct = (product) =>
  api.post("/farmer/product/create", product, {
    headers: {
      "Content-Type": "application/json",
    },
  });

// Get all products for the logged-in farmer
export const farmerGetProducts = () =>
  api.get("/farmer/products");
