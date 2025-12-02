import api from "../apiClient";

export const distributorGetFarmerProducts = () =>
  api.get("/distributor/products/farmer");

export const distributorCreateShipment = (shipment) =>
  api.post("/distributor/shipment/create", shipment);

export const distributorGetShipments = () =>
  api.get("/distributor/shipments");
