import api from "../apiClient";

export const retailerGetShipments = () =>
  api.get("/retailer/shipments");

export const retailerAcceptShipment = (id) =>
  api.put(`/retailer/shipment/${id}/accept`);
