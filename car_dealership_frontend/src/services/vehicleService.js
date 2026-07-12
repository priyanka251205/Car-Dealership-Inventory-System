import api from "./api";

export const getAllVehicles = async () => {
    const response = await api.get("/vehicles");
    return response.data;
};

export const searchVehicle = async (make) => {
    const response = await api.get(`/vehicles/search?make=${make}`);
    return response.data;
};

export const purchaseVehicle = async (id) => {
    const response = await api.post(`/vehicles/${id}/purchase`);
    return response.data;
};

export const deleteVehicle = async (id) => {
    const response = await api.delete(`/vehicles/${id}`);
    return response.data;
};