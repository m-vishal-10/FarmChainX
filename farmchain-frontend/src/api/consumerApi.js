import api from "../apiClient";

export const consumerGetProducts = () =>
  api.get("/consumer/products");

export const consumerPlaceOrder = (order) =>
  api.post("/consumer/order/place", order);

export const consumerGetOrders = () =>
  api.get("/consumer/orders");
