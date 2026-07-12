function VehicleCard({ vehicle, onPurchase }) {

    return (

        <div className="card shadow h-100">

            <div className="card-body">

                <h4>{vehicle.make}</h4>

                <h6>{vehicle.model}</h6>

                <p>

                    Category :
                    <strong> {vehicle.category}</strong>

                </p>

                <p>

                    Price :
                    <strong> ₹{vehicle.price}</strong>

                </p>

                <p>

                    Stock :
                    <strong> {vehicle.quantity}</strong>

                </p>

                <button

                    className="btn btn-success w-100"

                    disabled={vehicle.quantity === 0}

                    onClick={() => onPurchase(vehicle.id)}

                >

                    {
                        vehicle.quantity === 0

                            ? "Out Of Stock"

                            : "Purchase"
                    }

                </button>

            </div>

        </div>

    );

}

export default VehicleCard;