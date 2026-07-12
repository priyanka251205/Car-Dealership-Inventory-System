import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { addVehicle } from "../services/vehicleService";

function AddVehicle() {

    const navigate = useNavigate();

    const [vehicle, setVehicle] = useState({
        make: "",
        model: "",
        category: "",
        price: "",
        quantity: "",
        imageUrl: ""
    });

    const handleChange = (e) => {

        setVehicle({
            ...vehicle,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await addVehicle(vehicle);

            alert("Vehicle Added Successfully");

            navigate("/dashboard");

        } catch (error) {

            alert(error.response?.data || "Failed to Add Vehicle");

        }

    };

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <div className="row justify-content-center">

                    <div className="col-lg-8">

                        <div className="card shadow-lg border-0">

                            <div className="card-header bg-dark text-white">

                                <h3 className="mb-0">
                                    🚗 Add New Vehicle
                                </h3>

                            </div>

                            <div className="card-body">

                                <form onSubmit={handleSubmit}>

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Make
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="make"
                                            value={vehicle.make}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Model
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="model"
                                            value={vehicle.model}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Category
                                        </label>

                                        <select
                                            className="form-select"
                                            name="category"
                                            value={vehicle.category}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            <option>SUV</option>
                                            <option>Sedan</option>
                                            <option>Hatchback</option>
                                            <option>Sports</option>
                                            <option>Truck</option>
                                        </select>

                                    </div>

                                    <div className="row">

                                        <div className="col-md-6 mb-3">

                                            <label className="form-label">
                                                Price
                                            </label>

                                            <input
                                                type="number"
                                                className="form-control"
                                                name="price"
                                                value={vehicle.price}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>

                                        <div className="col-md-6 mb-3">

                                            <label className="form-label">
                                                Quantity
                                            </label>

                                            <input
                                                type="number"
                                                className="form-control"
                                                name="quantity"
                                                value={vehicle.quantity}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>

                                    </div>

                                    <div className="mb-4">

                                        <label className="form-label">
                                            Vehicle Image URL
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="imageUrl"
                                            value={vehicle.imageUrl}
                                            onChange={handleChange}
                                            placeholder="Paste Image URL"
                                            required
                                        />

                                    </div>

                                    {vehicle.imageUrl && (

                                        <div className="text-center mb-4">

                                            <img
                                                src={vehicle.imageUrl}
                                                alt="Preview"
                                                style={{
                                                    width: "100%",
                                                    maxHeight: "300px",
                                                    objectFit: "cover",
                                                    borderRadius: "10px"
                                                }}
                                            />

                                        </div>

                                    )}

                                    <button
                                        className="btn btn-success w-100"
                                    >
                                        Add Vehicle
                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default AddVehicle;