import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";
import { getVehicleById, updateVehicle } from "../services/vehicleService";

function EditVehicle() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [vehicle, setVehicle] = useState({
        make: "",
        model: "",
        category: "",
        price: "",
        quantity: "",
        imageUrl: ""
    });

    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ message: "", type: "" });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        let active = true;
        const fetchVehicle = async () => {
            try {
                const response = await getVehicleById(id);
                if (active) {
                    setVehicle(response.data);
                }
            } catch (error) {
                console.error(error);
                if (active) {
                    setToast({ message: "Unable to load vehicle details.", type: "error" });
                }
            }
        };

        fetchVehicle();

        return () => {
            active = false;
        };
    }, [id]);

    const handleChange = (e) => {
        setVehicle({
            ...vehicle,
            [e.target.name]: e.target.value
        });
        // Clear error for that field
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: ""
            });
        }
    };

    const validateForm = () => {
        const tempErrors = {};
        if (!vehicle.make.trim()) tempErrors.make = "Make is required.";
        if (!vehicle.model.trim()) tempErrors.model = "Model is required.";
        if (!vehicle.category.trim()) tempErrors.category = "Category is required.";

        const priceNum = Number(vehicle.price);
        if (!vehicle.price || isNaN(priceNum) || priceNum <= 0) {
            tempErrors.price = "Price must be a positive number.";
        }

        const qtyNum = Number(vehicle.quantity);
        if (vehicle.quantity === "" || isNaN(qtyNum) || qtyNum < 0 || !Number.isInteger(qtyNum)) {
            tempErrors.quantity = "Quantity must be a non-negative whole number.";
        }

        const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
        if (!vehicle.imageUrl.trim()) {
            tempErrors.imageUrl = "Image URL is required.";
        } else if (!urlPattern.test(vehicle.imageUrl.trim())) {
            tempErrors.imageUrl = "Please enter a valid HTTP/HTTPS image URL.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setToast({ message: "Please resolve form errors before submitting.", type: "error" });
            return;
        }

        setLoading(true);
        try {
            await updateVehicle(id, {
                ...vehicle,
                price: Number(vehicle.price),
                quantity: Number(vehicle.quantity)
            });

            setToast({ message: "Vehicle Updated Successfully! Redirecting...", type: "success" });
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);
        } catch (error) {
            console.error(error);
            const errMsg = error.response?.data?.message || error.response?.data || "Update Failed";
            setToast({ message: errMsg, type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card shadow-sm border-0 rounded-4">
                            <div className="card-header bg-primary text-white py-3 border-0 rounded-top-4">
                                <h3 className="mb-0 fw-bold">Edit Vehicle</h3>
                            </div>

                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Make</label>
                                        <input
                                            className={`form-control rounded-pill px-3 ${errors.make ? "is-invalid" : ""}`}
                                            name="make"
                                            value={vehicle.make}
                                            onChange={handleChange}
                                            required
                                        />
                                        {errors.make && <div className="invalid-feedback ps-2">{errors.make}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Model</label>
                                        <input
                                            className={`form-control rounded-pill px-3 ${errors.model ? "is-invalid" : ""}`}
                                            name="model"
                                            value={vehicle.model}
                                            onChange={handleChange}
                                            required
                                        />
                                        {errors.model && <div className="invalid-feedback ps-2">{errors.model}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Category</label>
                                        <input
                                            className={`form-control rounded-pill px-3 ${errors.category ? "is-invalid" : ""}`}
                                            name="category"
                                            value={vehicle.category}
                                            onChange={handleChange}
                                            required
                                        />
                                        {errors.category && <div className="invalid-feedback ps-2">{errors.category}</div>}
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-semibold">Price (INR)</label>
                                            <input
                                                type="number"
                                                className={`form-control rounded-pill px-3 ${errors.price ? "is-invalid" : ""}`}
                                                name="price"
                                                value={vehicle.price}
                                                onChange={handleChange}
                                                required
                                            />
                                            {errors.price && <div className="invalid-feedback ps-2">{errors.price}</div>}
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-semibold">Quantity</label>
                                            <input
                                                type="number"
                                                className={`form-control rounded-pill px-3 ${errors.quantity ? "is-invalid" : ""}`}
                                                name="quantity"
                                                value={vehicle.quantity}
                                                onChange={handleChange}
                                                required
                                            />
                                            {errors.quantity && <div className="invalid-feedback ps-2">{errors.quantity}</div>}
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">Image URL</label>
                                        <input
                                            className={`form-control rounded-pill px-3 ${errors.imageUrl ? "is-invalid" : ""}`}
                                            name="imageUrl"
                                            value={vehicle.imageUrl}
                                            onChange={handleChange}
                                            required
                                        />
                                        {errors.imageUrl && <div className="invalid-feedback ps-2">{errors.imageUrl}</div>}
                                    </div>

                                    {vehicle.imageUrl && !errors.imageUrl && (
                                        <div className="text-center mb-4">
                                            <p className="text-muted small mb-2">Image Preview</p>
                                            <img
                                                src={vehicle.imageUrl}
                                                alt="Preview"
                                                className="img-fluid border rounded-3"
                                                style={{
                                                    maxHeight: "300px",
                                                    width: "100%",
                                                    objectFit: "cover"
                                                }}
                                                onError={(e) => {
                                                    e.target.style.display = "none";
                                                }}
                                            />
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100 rounded-pill py-2.5 fs-5 fw-semibold shadow-sm"
                                        disabled={loading}
                                    >
                                        {loading ? "Updating Vehicle..." : "Update Vehicle"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ message: "", type: "" })}
            />
        </>
    );
}

export default EditVehicle;