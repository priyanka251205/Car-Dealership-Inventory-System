import { useNavigate } from "react-router-dom";

function VehicleCard({ vehicle, onPurchase, onDelete }) {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    return (

        <div className="card shadow-lg border-0 h-100 vehicle-card">

            <img
                src={vehicle.imageUrl || "https://via.placeholder.com/600x350?text=Car"}
                alt={vehicle.make}
                className="card-img-top"
                style={{
                    height: "220px",
                    objectFit: "cover"
                }}
                onError={(e) => {
                    e.target.src = "https://via.placeholder.com/600x350?text=Car";
                }}
            />

            <div className="card-body d-flex flex-column">

                <h4 className="fw-bold">
                    {vehicle.make}
                </h4>

                <h5 className="text-secondary">
                    {vehicle.model}
                </h5>

                <hr />

                <p>

                    <strong>Category :</strong>

                    {vehicle.category}

                </p>

                <p>

                    <strong>Price :</strong>

                    ₹ {vehicle.price.toLocaleString()}

                </p>

                <p>

                    <strong>Stock :</strong>

                    {vehicle.quantity}

                </p>

                <button

                    className="btn btn-success mt-auto"

                    disabled={vehicle.quantity === 0}

                    onClick={() => onPurchase(vehicle.id)}

                >

                    {vehicle.quantity === 0

                        ? "Out Of Stock"

                        : "Purchase"}

                </button>

                {role === "ADMIN" && (

                    <>

                        <button

                            className="btn btn-primary mt-2"

                            onClick={() => navigate(`/edit-vehicle/${vehicle.id}`)}

                        >

                            Edit

                        </button>

                        <button

                            className="btn btn-danger mt-2"

                            onClick={() => onDelete(vehicle.id)}

                        >

                            Delete

                        </button>

                        <button

                            className="btn btn-warning mt-2"

                        >

                            Restock

                        </button>

                    </>

                )}

            </div>

        </div>

    );

}

export default VehicleCard;