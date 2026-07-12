import { useEffect, useState, useCallback } from "react";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import VehicleCard from "../components/VehicleCard";
import Toast from "../components/Toast";
import ConfirmationModal from "../components/ConfirmationModal";
import RestockModal from "../components/RestockModal";

import {
    getAllVehicles,
    searchVehicles,
    purchaseVehicle,
    deleteVehicle,
    restockVehicle
} from "../services/vehicleService";

import "../styles/Dashboard.css";

function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  
  // Toast state
  const [toast, setToast] = useState({ message: "", type: "" });
  
  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [vehicleToRestock, setVehicleToRestock] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
  }, []);

  const loadVehicles = useCallback(() => {
    setReloadTrigger(prev => prev + 1);
  }, []);

  useEffect(() => {
    let active = true;
    const fetchInventory = async () => {
      try {
        setLoading(true);
        const response = await getAllVehicles();
        if (active) {
          setVehicles(response.data);
        }
      } catch (error) {
        console.error(error);
        if (active) {
          showToast("Unable to load vehicles.", "error");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchInventory();

    return () => {
      active = false;
    };
  }, [reloadTrigger, showToast]);

  const handleSearch = async (keyword) => {
    if (!keyword.trim()) {
      loadVehicles();
      return;
    }

    try {
      setLoading(true);
      const response = await searchVehicles(keyword);
      setVehicles(response.data);
    } catch (error) {
      console.error(error);
      showToast("Search failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (id) => {
    try {
      await purchaseVehicle(id);
      showToast("Vehicle Purchased Successfully", "success");
      loadVehicles();
    } catch (error) {
      showToast(error.response?.data || "Purchase Failed", "error");
    }
  };

  // Open delete modal
  const triggerDelete = (vehicle) => {
    setVehicleToDelete(vehicle);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!vehicleToDelete) return;
    try {
      await deleteVehicle(vehicleToDelete.id);
      showToast("Vehicle Deleted Successfully", "success");
      loadVehicles();
    } catch (error) {
      showToast(error.response?.data || "Delete Failed", "error");
    } finally {
      setShowDeleteModal(false);
      setVehicleToDelete(null);
    }
  };

  // Open restock modal
  const triggerRestock = (vehicle) => {
    setVehicleToRestock(vehicle);
    setShowRestockModal(true);
  };

  const confirmRestock = async (id, quantity) => {
    try {
      await restockVehicle(id, quantity);
      showToast("Vehicle Restocked Successfully", "success");
      loadVehicles();
    } catch (error) {
      showToast(error.response?.data || "Restock Failed", "error");
    } finally {
      setShowRestockModal(false);
      setVehicleToRestock(null);
    }
  };

  // Calculations for Stats
  const totalVehicles = vehicles.length;
  const inStockVehicles = vehicles.filter(v => v.quantity > 0).length;
  const outOfStockVehicles = vehicles.filter(v => v.quantity === 0).length;
  const totalInventoryValue = vehicles.reduce(
    (sum, vehicle) => sum + vehicle.price * vehicle.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <div className="container py-4 px-3">
        {/* Hero Section */}
        <div className="dashboard-hero text-center mb-5 p-5 bg-white shadow-sm border-0 rounded-4">
          <h1 className="display-5 fw-bold text-dark mb-3">
            🚗 Dealership Inventory
          </h1>
          <p className="lead text-secondary mx-auto" style={{ maxWidth: "700px" }}>
            Track car counts, values, and status. Restock, update, or purchase vehicles in real-time.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="row g-4 mb-5">
          <div className="col-xl-3 col-sm-6">
            <div className="card stat-card h-100 border-0 shadow-sm p-3 rounded-4">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="stat-icon bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: "56px", height: "56px" }}>
                  <span className="fs-3">🚘</span>
                </div>
                <div>
                  <h3 className="fw-bold mb-0 text-dark">{totalVehicles}</h3>
                  <p className="text-muted mb-0 small fw-medium">Total Inventory</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6">
            <div className="card stat-card h-100 border-0 shadow-sm p-3 rounded-4">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="stat-icon bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: "56px", height: "56px" }}>
                  <span className="fs-3">🟢</span>
                </div>
                <div>
                  <h3 className="fw-bold mb-0 text-dark">{inStockVehicles}</h3>
                  <p className="text-muted mb-0 small fw-medium">In Stock Cars</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6">
            <div className="card stat-card h-100 border-0 shadow-sm p-3 rounded-4">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="stat-icon bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center" style={{ width: "56px", height: "56px" }}>
                  <span className="fs-3">🔴</span>
                </div>
                <div>
                  <h3 className="fw-bold mb-0 text-dark">{outOfStockVehicles}</h3>
                  <p className="text-muted mb-0 small fw-medium">Out of Stock</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6">
            <div className="card stat-card h-100 border-0 shadow-sm p-3 rounded-4">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="stat-icon bg-warning-subtle text-warning-emphasis rounded-circle d-flex align-items-center justify-content-center" style={{ width: "56px", height: "56px" }}>
                  <span className="fs-3">💰</span>
                </div>
                <div>
                  <h4 className="fw-bold mb-0 text-dark">₹{totalInventoryValue.toLocaleString()}</h4>
                  <p className="text-muted mb-0 small fw-medium">Total Value</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar Component */}
        <SearchBar onSearch={handleSearch} />

        {/* Main Content Area */}
        {loading ? (
          <div className="d-flex flex-column align-items-center justify-content-center my-5 py-5 loading-wrapper">
            <div className="spinner-border text-primary mb-3" role="status" style={{ width: "3.5rem", height: "3.5rem", borderWidth: "4px" }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <h5 className="text-secondary fw-semibold">Loading dealership inventory...</h5>
          </div>
        ) : vehicles.length === 0 ? (
          <div className="text-center my-5 py-5 bg-white rounded-4 shadow-sm border-0 empty-state-container p-4">
            <div className="empty-state-icon bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "80px", height: "80px" }}>
              <span className="fs-1">🚘</span>
            </div>
            <h3 className="fw-bold text-dark mb-2">No Vehicles Available</h3>
            <p className="text-muted mx-auto" style={{ maxWidth: "420px" }}>
              We couldn't find any vehicles in our inventory matching your search. Try adjusting your query or add a new vehicle.
            </p>
          </div>
        ) : (
          <div className="row mt-4 g-4">
            {vehicles.map((vehicle) => (
              <div className="col-xl-4 col-md-6 col-sm-12" key={vehicle.id}>
                <VehicleCard
                  vehicle={vehicle}
                  onPurchase={handlePurchase}
                  onDelete={triggerDelete}
                  onRestock={triggerRestock}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation & Restock Modals */}
      <ConfirmationModal
        show={showDeleteModal}
        title="Delete Vehicle"
        message={`Are you sure you want to delete ${vehicleToDelete?.make} ${vehicleToDelete?.model} from the inventory? This action is permanent.`}
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowDeleteModal(false);
          setVehicleToDelete(null);
        }}
      />

      <RestockModal
        key={vehicleToRestock ? vehicleToRestock.id : "closed"}
        show={showRestockModal}
        vehicle={vehicleToRestock}
        onConfirm={confirmRestock}
        onCancel={() => {
          setShowRestockModal(false);
          setVehicleToRestock(null);
        }}
      />

      {/* Toast Alert Emitter */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "" })}
      />
    </>
  );
}

export default Dashboard;
