import { useEffect, useState, useCallback } from "react";

import Navbar from "../components/Navbar";
import VehicleCard from "../components/VehicleCard";
import Toast from "../components/Toast";
import { getAllVehicles, getPurchaseHistory } from "../services/vehicleService";

import "../styles/Dashboard.css";

function Dashboard() {
  const role = localStorage.getItem("role");

  const [vehicles, setVehicles] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reloadTrigger, setReloadTrigger] = useState(0);
  
  // Toast state
  const [toast, setToast] = useState({ message: "", type: "" });

  // Filters State
  const [filterMake, setFilterMake] = useState("");
  const [filterModel, setFilterModel] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPriceRange, setFilterPriceRange] = useState("");
  const [filterStockStatus, setFilterStockStatus] = useState("");
  const [sortBy, setSortBy] = useState("make-az");

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
  }, []);

  const loadVehicles = useCallback(() => {
    setReloadTrigger(prev => prev + 1);
  }, []);

  // Fetch Inventory and History
  useEffect(() => {
    let active = true;

    const fetchInventory = async () => {
      try {
        setLoading(true);
        const response = await getAllVehicles();
        if (active) {
          setVehicles(response.data || []);
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

    const fetchHistoryData = async () => {
      if (role === "ADMIN") {
        try {
          const response = await getPurchaseHistory();
          if (active) {
            setHistory(response.data || []);
          }
        } catch (error) {
          console.error("Unable to load history:", error);
        }
      }
    };

    fetchInventory();
    fetchHistoryData();

    return () => {
      active = false;
    };
  }, [reloadTrigger, role, showToast]);

  const clearFilters = () => {
    setFilterMake("");
    setFilterModel("");
    setFilterCategory("");
    setFilterPriceRange("");
    setFilterStockStatus("");
    setSortBy("make-az");
  };

  // Instant Filtering Logic
  const filteredVehicles = vehicles.filter(v => {
    // 1. Make
    if (filterMake.trim() && !v.make.toLowerCase().includes(filterMake.toLowerCase())) return false;
    // 2. Model
    if (filterModel.trim() && !v.model.toLowerCase().includes(filterModel.toLowerCase())) return false;
    // 3. Category
    if (filterCategory && v.category !== filterCategory) return false;
    // 4. Price Range
    if (filterPriceRange) {
      if (filterPriceRange === "under-5l" && v.price >= 500000) return false;
      if (filterPriceRange === "5l-10l" && (v.price < 500000 || v.price > 1000000)) return false;
      if (filterPriceRange === "10l-20l" && (v.price < 1000000 || v.price > 2000000)) return false;
      if (filterPriceRange === "over-20l" && v.price <= 2000000) return false;
    }
    // 5. Stock Status
    if (filterStockStatus) {
      if (filterStockStatus === "in-stock" && v.quantity <= 3) return false;
      if (filterStockStatus === "low-stock" && (v.quantity < 1 || v.quantity > 3)) return false;
      if (filterStockStatus === "out-of-stock" && v.quantity !== 0) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === "price-lh") return a.price - b.price;
    if (sortBy === "price-hl") return b.price - a.price;
    if (sortBy === "newest") return b.id - a.id;
    if (sortBy === "oldest") return a.id - b.id;
    if (sortBy === "make-az") return a.make.localeCompare(b.make);
    return 0;
  });

  // Stats Computations
  const totalVehicles = vehicles.length;
  const inStockVehicles = vehicles.filter(v => v.quantity > 3).length;
  const lowStockVehicles = vehicles.filter(v => v.quantity >= 1 && v.quantity <= 3).length;
  const outOfStockVehicles = vehicles.filter(v => v.quantity === 0).length;
  const totalInventoryValue = vehicles.reduce((sum, v) => sum + v.price * v.quantity, 0);
  const vehiclesSold = history.reduce((sum, h) => sum + h.quantity, 0);

  // Get 3 most recent purchases
  const recentPurchases = [...history].sort((a, b) => b.id - a.id).slice(0, 3);

  return (
    <>
      <Navbar />

      <div className="container py-4 px-3">
        {/* Header Section without Car Emoji */}
        <div className="dashboard-hero mb-4 p-4 border-0 rounded-4">
          <h1 className="fw-bold text-dark mb-2" style={{ letterSpacing: "-0.03em" }}>
            Luxora Motors Premium Inventory
          </h1>
          <p className="text-secondary mb-0 small">
            Track car counts, evaluate values, filter listings, and log sales transactions.
          </p>
        </div>

        {/* Statistics Cards Grid */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-4 col-xl-2">
            <div className="card stat-card h-100 border-0 shadow-sm p-2 rounded-4">
              <div className="card-body py-3 px-2 text-center">
                <h3 className="fw-bold mb-1 text-primary">{totalVehicles}</h3>
                <p className="text-muted mb-0 small fw-medium">Total Vehicles</p>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-4 col-xl-2">
            <div className="card stat-card h-100 border-0 shadow-sm p-2 rounded-4">
              <div className="card-body py-3 px-2 text-center">
                <h3 className="fw-bold mb-1 text-success">{inStockVehicles}</h3>
                <p className="text-muted mb-0 small fw-medium">In Stock</p>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-4 col-xl-2">
            <div className="card stat-card h-100 border-0 shadow-sm p-2 rounded-4">
              <div className="card-body py-3 px-2 text-center">
                <h3 className="fw-bold mb-1 text-warning">{lowStockVehicles}</h3>
                <p className="text-muted mb-0 small fw-medium">Low Stock</p>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-4 col-xl-2">
            <div className="card stat-card h-100 border-0 shadow-sm p-2 rounded-4">
              <div className="card-body py-3 px-2 text-center">
                <h3 className="fw-bold mb-1 text-danger">{outOfStockVehicles}</h3>
                <p className="text-muted mb-0 small fw-medium">Out of Stock</p>
              </div>
            </div>
          </div>

          {role === "ADMIN" && (
            <div className="col-6 col-md-4 col-xl-2">
              <div className="card stat-card h-100 border-0 shadow-sm p-2 rounded-4">
                <div className="card-body py-3 px-2 text-center">
                  <h4 className="fw-bold mb-1 text-dark">₹{totalInventoryValue.toLocaleString()}</h4>
                  <p className="text-muted mb-0 small fw-medium">Total Value</p>
                </div>
              </div>
            </div>
          )}

          {role === "ADMIN" && (
            <div className="col-6 col-md-4 col-xl-2">
              <div className="card stat-card h-100 border-0 shadow-sm p-2 rounded-4">
                <div className="card-body py-3 px-2 text-center">
                  <h3 className="fw-bold mb-1 text-info">{vehiclesSold}</h3>
                  <p className="text-muted mb-0 small fw-medium">Vehicles Sold</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="row g-4">
          {/* Main Inventory Panel */}
          <div className="col-12">
            
            {/* Filter Section */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <h5 className="fw-bold text-dark mb-3">🔍 Search and Filter Tools</h5>
              <div className="row g-3">
                {/* Search Fields */}
                <div className="col-md-6 col-lg-3">
                  <input
                    type="text"
                    className="form-control rounded-pill px-3 shadow-sm border-secondary-subtle"
                    placeholder="Search Make (e.g. Toyota)"
                    value={filterMake}
                    onChange={(e) => setFilterMake(e.target.value)}
                  />
                </div>
                <div className="col-md-6 col-lg-3">
                  <input
                    type="text"
                    className="form-control rounded-pill px-3 shadow-sm border-secondary-subtle"
                    placeholder="Search Model (e.g. Camry)"
                    value={filterModel}
                    onChange={(e) => setFilterModel(e.target.value)}
                  />
                </div>

                {/* Dropdowns */}
                <div className="col-md-4 col-lg-2">
                  <select
                    className="form-select rounded-pill px-3 shadow-sm border-secondary-subtle"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="">Category</option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Sports">Sports</option>
                    <option value="Truck">Truck</option>
                  </select>
                </div>

                <div className="col-md-4 col-lg-2">
                  <select
                    className="form-select rounded-pill px-3 shadow-sm border-secondary-subtle"
                    value={filterPriceRange}
                    onChange={(e) => setFilterPriceRange(e.target.value)}
                  >
                    <option value="">Price Range</option>
                    <option value="under-5l">Under ₹500,000</option>
                    <option value="5l-10l">₹500,000 - ₹1,000,000</option>
                    <option value="10l-20l">₹1,000,000 - ₹2,000,000</option>
                    <option value="over-20l">Over ₹2,000,000</option>
                  </select>
                </div>

                <div className="col-md-4 col-lg-2">
                  <select
                    className="form-select rounded-pill px-3 shadow-sm border-secondary-subtle"
                    value={filterStockStatus}
                    onChange={(e) => setFilterStockStatus(e.target.value)}
                  >
                    <option value="">Stock Status</option>
                    <option value="in-stock">In Stock (&gt;3)</option>
                    <option value="low-stock">Low Stock (1-3)</option>
                    <option value="out-of-stock">Out of Stock</option>
                  </select>
                </div>

                {/* Sort & Action */}
                <div className="col-md-6 col-lg-3">
                  <select
                    className="form-select rounded-pill px-3 shadow-sm border-secondary-subtle"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="make-az">Sort Make: A-Z</option>
                    <option value="price-lh">Price: Low to High</option>
                    <option value="price-hl">Price: High to Low</option>
                    <option value="newest">Added: Newest First</option>
                    <option value="oldest">Added: Oldest First</option>
                  </select>
                </div>

                <div className="col-md-6 col-lg-3 d-flex align-items-center">
                  <button 
                    className="btn btn-outline-secondary rounded-pill w-100 py-2 fw-semibold"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Inventory Display Area */}
            {loading ? (
              <div className="d-flex flex-column align-items-center justify-content-center my-5 py-5 loading-wrapper">
                <div className="spinner-border text-primary mb-3" role="status" style={{ width: "3rem", height: "3rem" }} />
                <h5 className="text-secondary fw-semibold">Loading dealership inventory...</h5>
              </div>
            ) : filteredVehicles.length === 0 ? (
              <div className="text-center my-5 py-5 rounded-4 shadow-sm border-0 empty-state-container p-4">
                <div className="empty-state-icon bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "70px", height: "70px" }}>
                  <span className="fs-2">🔍</span>
                </div>
                <h4 className="fw-bold text-dark mb-1">No Matching Vehicles</h4>
                <p className="text-muted mx-auto mb-0" style={{ maxWidth: "380px" }}>
                  We couldn't find any vehicles matching your search criteria. Try modifying your filter rules or clear selections.
                </p>
              </div>
            ) : (
              <div className="row g-4">
                {filteredVehicles.map((vehicle) => (
                  <div className="col-md-6 col-lg-4 col-xl-3" key={vehicle.id}>
                    <VehicleCard vehicle={vehicle} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

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
