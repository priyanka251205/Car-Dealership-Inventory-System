function VehicleCard({ vehicle, onPurchase }) {
  return (
    <div className="card shadow h-100">

      <div className="card-body">

        <h4>{vehicle.make}</h4>

        <h5>{vehicle.model}</h5>

        <p>
          <strong>Category:</strong> {vehicle.category}
        </p>

        <p>
          <strong>Price:</strong> ₹{vehicle.price}
        </p>

        <p>
          <strong>Stock:</strong> {vehicle.quantity}
        </p>

        <button
          className="btn btn-success w-100"
          disabled={vehicle.quantity === 0}
          onClick={() => onPurchase(vehicle.id)}
        >
          {vehicle.quantity === 0
            ? "Out of Stock"
            : "Purchase"}
        </button>

      </div>

    </div>
  );
}

export default VehicleCard;