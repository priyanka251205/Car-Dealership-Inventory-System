import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getVehicleImage from "../../utils/getVehicleImage";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";
import ConfirmationModal from "../components/ConfirmationModal";
import RestockModal from "../components/RestockModal";
import PurchaseModal from "../components/PurchaseModal";
import { getVehicleById, deleteVehicle, restockVehicle, submitPurchase } from "../services/vehicleService";

function VehicleDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({ message: "", type: "" });

    // Modals
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showRestockModal, setShowRestockModal] = useState(false);
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);

    const showToast = useCallback((message, type = "success") => {
        setToast({ message, type });
    }, []);

    const fetchVehicle = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getVehicleById(id);
            setVehicle(response.data);
        } catch (error) {
            console.error(error);
            showToast("Failed to load vehicle details.", "error");
        } finally {
            setLoading(false);
        }
    }, [id, showToast]);

    useEffect(() => {
        fetchVehicle();
    }, [fetchVehicle]);

    // Handle Delete
    const handleDelete = async () => {
        try {
            await deleteVehicle(id);
            showToast("Vehicle Deleted Successfully", "success");
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);
        } catch (error) {
            showToast(error.response?.data || "Delete Failed", "error");
        } finally {
            setShowDeleteModal(false);
        }
    };

    // Handle Restock
    const handleRestock = async (vehicleId, qty) => {
        try {
            await restockVehicle(vehicleId, qty);
            showToast(`Successfully restocked ${qty} units!`, "success");
            fetchVehicle();
        } catch (error) {
            showToast(error.response?.data || "Restock Failed", "error");
        } finally {
            setShowRestockModal(false);
        }
    };

    // Handle Purchase
    const handlePurchase = async (purchaseData) => {
        try {
            await submitPurchase(purchaseData);
            showToast("Purchase Completed Successfully!", "success");
            fetchVehicle();
        } catch (error) {
            console.error(error);
            const errMsg = error.response?.data?.message || error.response?.data || "Purchase Failed";
            showToast(errMsg, "error");
        } finally {
            setShowPurchaseModal(false);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="d-flex flex-column align-items-center justify-content-center min-vh-50 py-5">
                    <div className="spinner-border text-primary mb-3" role="status" style={{ width: "3rem", height: "3rem" }} />
                    <h5 className="text-secondary fw-semibold">Loading vehicle details...</h5>
                </div>
            </>
        );
    }

    if (!vehicle) {
        return (
            <>
                <Navbar />
                <div className="container py-5 text-center">
                    <div className="alert alert-warning py-4 px-3 rounded-4 d-inline-block shadow-sm" style={{ maxWidth: "500px" }}>
                        <span className="fs-1 d-block mb-3">⚠️</span>
                        <h4 className="fw-bold">Vehicle Not Found</h4>
                        <p className="text-muted mb-3">The vehicle you are looking for does not exist or has been removed.</p>
                        <button className="btn btn-primary rounded-pill px-4" onClick={() => navigate("/dashboard")}>
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container py-5">
                <nav aria-label="breadcrumb" className="mb-4">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><span className="text-primary cursor-pointer" onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>Dashboard</span></li>
                        <li className="breadcrumb-item active" aria-current="page">{vehicle.make} {vehicle.model}</li>
                    </ol>
                </nav>

                <div className="row g-5">
                    {/* Image Column */}
                    <div className="col-lg-7">
                        <div className="card border-0 shadow-sm rounded-4 overflow-hidden" style={{ minHeight: "400px" }}>
                            <img
                                src={vehicle.imageUrl || getVehicleImage(vehicle)}
                                alt={`${vehicle.make} ${vehicle.model}`}
                                className="img-fluid w-100 h-100"
                                style={{ objectFit: "cover", maxHeight: "550px" }}
                                onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/800x500?text=Car";
                                }}
                            />
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="col-lg-5 d-flex flex-column justify-content-between">
                        <div>
                            <div className="d-flex align-items-center gap-2 mb-2">
                                <span className="badge bg-secondary rounded-pill uppercase px-3 py-1.5 fs-7 fw-semibold">
                                    {vehicle.category}
                                </span>
                                {vehicle.quantity === 0 ? (
                                    <span className="badge bg-danger rounded-pill px-3 py-1.5 fs-7 fw-semibold">
                                        Out Of Stock
                                    </span>
                                ) : vehicle.quantity <= 3 ? (
                                    <span className="badge bg-warning text-dark rounded-pill px-3 py-1.5 fs-7 fw-semibold">
                                        Low Stock ({vehicle.quantity})
                                    </span>
                                ) : (
                                    <span className="badge bg-success rounded-pill px-3 py-1.5 fs-7 fw-semibold">
                                        In Stock ({vehicle.quantity})
                                    </span>
                                )}
                            </div>

                            <h1 className="display-5 fw-bold text-dark mb-1">{vehicle.make}</h1>
                            <h3 className="text-secondary fw-normal mb-4">{vehicle.model} ({vehicle.year})</h3>
                            
                            <hr className="my-4" />

                            <div className="mb-4">
                                <span className="text-secondary small fw-semibold d-block uppercase mb-1">M.R.P.</span>
                                <h2 className="text-success fw-bold display-6 mb-0">
                                    ₹ {vehicle.price.toLocaleString()}
                                </h2>
                            </div>

                            <div className="mb-4">
                                <span className="text-secondary small fw-semibold d-block uppercase mb-2">Description</span>
                                <p className="text-dark leading-relaxed" style={{ fontSize: "1.05rem" }}>
                                    {vehicle.description || "No description available for this vehicle."}
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-top">
                            <button
                                className="btn btn-primary btn-lg w-100 rounded-pill py-3 fw-bold shadow-sm"
                                disabled={vehicle.quantity === 0}
                                onClick={() => setShowPurchaseModal(true)}
                            >
                                {vehicle.quantity === 0 ? "Out Of Stock" : "Purchase Vehicle"}
                            </button>

                            {role === "ADMIN" && (
                                <div className="mt-4 pt-3 border-top">
                                    <h6 className="fw-bold text-secondary mb-3 small uppercase">Administrative Controls</h6>
                                    <div className="row g-2">
                                        <div className="col-4">
                                            <button
                                                className="btn btn-outline-secondary w-100 rounded-pill py-2.5 fw-semibold"
                                                onClick={() => navigate(`/edit-vehicle/${vehicle.id}`)}
                                            >
                                                Edit
                                            </button>
                                        </div>
                                        <div className="col-4">
                                            <button
                                                className="btn btn-outline-danger w-100 rounded-pill py-2.5 fw-semibold"
                                                onClick={() => setShowDeleteModal(true)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                        <div className="col-4">
                                            <button
                                                className="btn btn-warning w-100 rounded-pill py-2.5 fw-semibold text-dark"
                                                onClick={() => setShowRestockModal(true)}
                                            >
                                                Restock
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <ConfirmationModal
                show={showDeleteModal}
                title="Delete Vehicle"
                message={`Are you sure you want to permanently delete this ${vehicle.make} ${vehicle.model} from the dealership inventory?`}
                onConfirm={handleDelete}
                onCancel={() => setShowDeleteModal(false)}
            />

            <RestockModal
                key={showRestockModal ? vehicle.id : "closed"}
                show={showRestockModal}
                vehicle={vehicle}
                onConfirm={handleRestock}
                onCancel={() => setShowRestockModal(false)}
            />

            <PurchaseModal
                show={showPurchaseModal}
                vehicle={vehicle}
                onConfirm={handlePurchase}
                onCancel={() => setShowPurchaseModal(false)}
            />

            <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ message: "", type: "" })}
            />
        </>
    );
}

export default VehicleDetails;
