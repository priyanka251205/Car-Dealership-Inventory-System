import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import VehicleCard from "../components/VehicleCard";
import {
  getAllVehicles,
  searchVehicles,
  purchaseVehicle,
} from "../services/vehicleService";

function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await getAllVehicles();
      setVehicles(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load vehicles");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (keyword) => {
    if (!keyword.trim()) {
      fetchVehicles();
      return;
    }

    try {
      const response = await searchVehicles(keyword);
      setVehicles(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePurchase = async (id) => {
    try {
      await purchaseVehicle(id);
      alert("Vehicle purchased successfully");
      fetchVehicles();
    } catch (error) {
      alert(error.response?.data || "Purchase Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <SearchBar onSearch={handleSearch} />

        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-primary"></div>
          </div>
        ) : vehicles.length === 0 ? (
          <h3 className="text-center mt-5">No Vehicles Found</h3>
        ) : (
          <div className="row mt-4">
            {vehicles.map((vehicle) => (
              <div className="col-md-4 mb-4" key={vehicle.id}>
                <VehicleCard
                  vehicle={vehicle}
                  onPurchase={handlePurchase}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;