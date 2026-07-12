function VehicleCard({ vehicle, onPurchase }) {
  return (
    <div className="card shadow h-100 vehicle-card">
      <div className="card-body">

        <h4 className="fw-bold">{vehicle.make}</h4>

        <h5 className="text-secondary">
          {vehicle.model}
        </h5>

        <hr />

        <p>
          <strong>Category :</strong> {vehicle.category}
        </p>

        <p>
          <strong>Price :</strong> ₹{vehicle.price}
        </p>

        <p>
          <strong>Stock :</strong> {vehicle.quantity}
        </p>

        <button
          className="btn btn-success w-100"
          disabled={vehicle.quantity === 0}
          onClick={() => onPurchase(vehicle.id)}
        >
          {vehicle.quantity === 0
            ? "Out Of Stock"
            : "Purchase"}
        </button>

      </div>
    </div>
  );
}

export default VehicleCard;