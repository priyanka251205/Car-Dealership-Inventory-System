import { useNavigate } from "react-router-dom";
import getVehicleImage from "../../utils/getVehicleImage";
import "../styles/VehicalCard.css";

function VehicleCard({ vehicle }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/vehicle/${vehicle.id}`);
    };

    return (
        <div 
            className="card h-100 border-0 shadow-sm vehicle-card cursor-pointer"
            onClick={handleClick}
            style={{ cursor: "pointer" }}
        >
            <div className="position-relative overflow-hidden card-image-wrapper">
                <img
                    src={vehicle.imageUrl || getVehicleImage(vehicle)}
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
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <h4 className="fw-bold mb-0 text-dark vehicle-make">
                        {vehicle.make}
                    </h4>
                    <span className="badge bg-light text-dark border px-2 py-1 rounded-3 small">
                        {vehicle.year}
                    </span>
                </div>
                <h5 className="text-muted fw-normal mb-3 vehicle-model">
                    {vehicle.model}
                </h5>

                <div className="d-flex justify-content-between align-items-center mt-auto">
                    <h3 className="text-success fw-bold mb-0 price-tag">
                        ₹ {vehicle.price.toLocaleString()}
                    </h3>

                    <div>
                        {vehicle.quantity === 0 ? (
                            <span className="badge bg-danger-subtle text-danger px-2.5 py-1.5 rounded-pill small fw-semibold">
                                Out Of Stock
                            </span>
                        ) : vehicle.quantity <= 3 ? (
                            <span className="badge bg-warning-subtle text-warning-emphasis px-2.5 py-1.5 rounded-pill small fw-semibold">
                                Low Stock ({vehicle.quantity})
                            </span>
                        ) : (
                            <span className="badge bg-success-subtle text-success px-2.5 py-1.5 rounded-pill small fw-semibold">
                                In Stock ({vehicle.quantity})
                            </span>
                        )}
                    </div>
                </div>

                <div className="mt-3 pt-3 border-top d-grid">
                    <button className="btn btn-outline-primary rounded-pill py-2 fw-semibold">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VehicleCard;