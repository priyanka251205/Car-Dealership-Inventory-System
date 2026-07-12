import api from "./api";

export const getAllVehicles = () =>
    api.get("/vehicles");

export const getVehicleById = (id) =>
    api.get(`/vehicles/${id}`);

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

export const restockVehicle = (id, quantity) =>
    api.post(`/vehicles/${id}/restock?quantity=${quantity}`);

export const submitPurchase = (purchaseData) =>
    api.post("/purchase", purchaseData);

export const getPurchaseHistory = () =>
    api.get("/purchase-history");