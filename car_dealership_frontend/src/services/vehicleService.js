import api from "./api";

export const getAllVehicles = () =>
  api.get("/vehicles");

export const searchVehicles = (keyword) =>
  api.get(`/vehicles/search?make=${keyword}`);

export const purchaseVehicle = (id) =>
  api.post(`/vehicles/${id}/purchase`);

export const addVehicle = (vehicle) =>
  api.post("/vehicles", vehicle);

export const updateVehicle = (id, vehicle) =>
  api.put(`/vehicles/${id}`, vehicle);

export const deleteVehicle = (id) =>
  api.delete(`/vehicles/${id}`);