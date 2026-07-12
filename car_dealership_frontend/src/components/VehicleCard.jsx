import { useNavigate } from "react-router-dom";
import "../styles/VehicalCard.css";

function VehicleCard({ vehicle, onPurchase, onDelete, onRestock }) {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    return (
        <div className="card h-100 border-0 shadow-sm vehicle-card">
            <div className="position-relative overflow-hidden card-image-wrapper">
                <img
                    src={vehicle.imageUrl || "https://via.placeholder.com/600x350?text=Car"}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="card-img-top vehicle-card-img"
                    onError={(e) => {
                        e.target.src = "https://via.placeholder.com/600x350?text=Car";
                    }}
                />
                <span className="badge bg-secondary position-absolute top-0 start-0 m-3 category-badge">
                    {vehicle.category}
                </span>
            </div>

            <div className="card-body d-flex flex-column p-4">
                <div className="d-flex justify-content-between align-items-start mb-1">
                    <h4 className="fw-bold mb-0 text-dark vehicle-make">
                        {vehicle.make}
                    </h4>
                </div>
                <h5 className="text-muted fw-normal mb-3 vehicle-model">
                    {vehicle.model}
                </h5>

                <h3 className="text-success fw-bold mb-3 price-tag">
                    ₹ {vehicle.price.toLocaleString()}
                </h3>

                <div className="mb-4">
                    {vehicle.quantity === 0 ? (
                        <span className="badge bg-danger-subtle text-danger px-3 py-2 rounded-pill fs-6 fw-semibold">
                            Out Of Stock
                        </span>
                    ) : vehicle.quantity <= 3 ? (
                        <span className="badge bg-warning-subtle text-warning-emphasis px-3 py-2 rounded-pill fs-6 fw-semibold">
                            Low Stock ({vehicle.quantity})
                        </span>
                    ) : (
                        <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill fs-6 fw-semibold">
                            In Stock ({vehicle.quantity})
                        </span>
                    )}
                </div>

                <div className="mt-auto d-grid gap-2">
                    <button
                        className="btn btn-primary rounded-pill py-2 fw-semibold purchase-btn"
                        disabled={vehicle.quantity === 0}
                        onClick={() => onPurchase(vehicle.id)}
                    >
                        {vehicle.quantity === 0 ? "Out Of Stock" : "Purchase Vehicle"}
                    </button>

                    {role === "ADMIN" && (
                        <div className="admin-actions d-grid gap-2 mt-2 pt-2 border-top">
                            <div className="row g-2">
                                <div className="col-6">
                                    <button
                                        className="btn btn-outline-secondary w-100 rounded-pill py-2 fw-semibold"
                                        onClick={() => navigate(`/edit-vehicle/${vehicle.id}`)}
                                    >
                                        Edit
                                    </button>
                                </div>
                                <div className="col-6">
                                    <button
                                        className="btn btn-outline-danger w-100 rounded-pill py-2 fw-semibold"
                                        onClick={() => onDelete(vehicle)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <button
                                className="btn btn-warning w-100 rounded-pill py-2 fw-semibold text-dark mt-1"
                                onClick={() => onRestock(vehicle)}
                            >
                                Restock
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VehicleCard;