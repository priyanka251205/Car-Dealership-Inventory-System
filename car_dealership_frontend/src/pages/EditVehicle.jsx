import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";
import { getVehicleById, updateVehicle } from "../services/vehicleService";
import getVehicleImage from "../../utils/getVehicleImage";

function EditVehicle() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [vehicle, setVehicle] = useState({
        make: "",
        model: "",
        category: "",
        price: "",
        quantity: "",
        imageUrl: "",
        year: "",
        description: ""
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
                    setVehicle({
                        make: response.data.make || "",
                        model: response.data.model || "",
                        category: response.data.category || "",
                        price: response.data.price || "",
                        quantity: response.data.quantity || "",
                        imageUrl: response.data.imageUrl || "",
                        year: response.data.year || "",
                        description: response.data.description || ""
                    });
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

        const yearNum = Number(vehicle.year);
        const currentYear = new Date().getFullYear();
        if (!vehicle.year || isNaN(yearNum) || yearNum < 1886 || yearNum > currentYear + 1 || !Number.isInteger(yearNum)) {
            tempErrors.year = `Year must be a valid four-digit integer (1886 - ${currentYear + 1}).`;
        }

        if (!vehicle.description.trim()) {
            tempErrors.description = "Description is required.";
        } else if (vehicle.description.trim().length < 10) {
            tempErrors.description = "Description must be at least 10 characters long.";
        }

        const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
        if (vehicle.imageUrl.trim() && !urlPattern.test(vehicle.imageUrl.trim())) {
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
            const finalImageUrl = vehicle.imageUrl.trim() || getVehicleImage({
                make: vehicle.make,
                model: vehicle.model,
                category: vehicle.category,
                year: vehicle.year
            });

            await updateVehicle(id, {
                ...vehicle,
                imageUrl: finalImageUrl,
                price: Number(vehicle.price),
                quantity: Number(vehicle.quantity),
                year: Number(vehicle.year)
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
                            <div className="card-header py-3 border-0 rounded-top-4" style={{ background: "rgba(255, 255, 255, 0.03)", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
                                <h3 className="mb-0 fw-bold d-flex align-items-center gap-2" style={{ background: "linear-gradient(to right, #60a5fa, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "inline-block" }}>
                                    Edit Vehicle
                                </h3>
                            </div>

                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
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

                                        <div className="col-md-6 mb-3">
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
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
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

                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-semibold">Year</label>
                                            <input
                                                type="number"
                                                className={`form-control rounded-pill px-3 ${errors.year ? "is-invalid" : ""}`}
                                                name="year"
                                                value={vehicle.year}
                                                onChange={handleChange}
                                                required
                                            />
                                            {errors.year && <div className="invalid-feedback ps-2">{errors.year}</div>}
                                        </div>
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

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Description</label>
                                        <textarea
                                            className={`form-control ${errors.description ? "is-invalid" : ""}`}
                                            name="description"
                                            rows="3"
                                            value={vehicle.description}
                                            onChange={handleChange}
                                            style={{ borderRadius: "16px", padding: "12px 18px" }}
                                            required
                                        />
                                        {errors.description && <div className="invalid-feedback ps-2">{errors.description}</div>}
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">Image URL (Optional)</label>
                                        <input
                                            className={`form-control rounded-pill px-3 ${errors.imageUrl ? "is-invalid" : ""}`}
                                            name="imageUrl"
                                            value={vehicle.imageUrl}
                                            onChange={handleChange}
                                            placeholder="Leave blank to auto-generate image or enter URL"
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
                                        {loading ? "Updating..." : "Update Vehicle"}
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