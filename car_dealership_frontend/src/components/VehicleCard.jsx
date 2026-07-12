function VehicleCard({ vehicle, onPurchase }) {
  return (
    <div className="card vehicle-card shadow">

      <div className="card-body">

        <h4>{vehicle.make}</h4>

        <h5 className="text-muted">{vehicle.model}</h5>

        <hr />

        <p>
          <strong>Category</strong><br />
          {vehicle.category}
        </p>

        <p>
          <strong>Price</strong><br />
          ₹ {vehicle.price}
        </p>

        <p>
          <strong>Stock</strong><br />
          {vehicle.quantity}
        </p>

        <button
          className="btn btn-success w-100"
          disabled={vehicle.quantity === 0}
          onClick={() => onPurchase(vehicle.id)}
        >
          {vehicle.quantity === 0 ? "Out of Stock" : "Purchase"}
        </button>

      </div>

    </div>
  );
}

export default VehicleCard;