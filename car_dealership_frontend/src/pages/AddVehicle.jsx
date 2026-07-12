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
        quantity: ""
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

                <div className="card shadow p-4">

                    <h2 className="mb-4">
                        Add Vehicle
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <input
                            className="form-control mb-3"
                            placeholder="Make"
                            name="make"
                            value={vehicle.make}
                            onChange={handleChange}
                            required
                        />

                        <input
                            className="form-control mb-3"
                            placeholder="Model"
                            name="model"
                            value={vehicle.model}
                            onChange={handleChange}
                            required
                        />

                        <input
                            className="form-control mb-3"
                            placeholder="Category"
                            name="category"
                            value={vehicle.category}
                            onChange={handleChange}
                            required
                        />

                        <input
                            className="form-control mb-3"
                            type="number"
                            placeholder="Price"
                            name="price"
                            value={vehicle.price}
                            onChange={handleChange}
                            required
                        />

                        <input
                            className="form-control mb-3"
                            type="number"
                            placeholder="Quantity"
                            name="quantity"
                            value={vehicle.quantity}
                            onChange={handleChange}
                            required
                        />

                        <button
                            className="btn btn-success w-100"
                        >
                            Add Vehicle
                        </button>

                    </form>

                </div>

            </div>

        </>

    );

}

export default AddVehicle;