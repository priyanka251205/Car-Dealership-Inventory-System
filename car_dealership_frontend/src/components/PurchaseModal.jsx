import { useState, useEffect } from "react";

function PurchaseModal({ show, vehicle, onConfirm, onCancel }) {
    const [form, setForm] = useState({
        customerName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        quantity: 1
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (show) {
            setForm({
                customerName: "",
                email: "",
                phone: "",
                address: "",
                city: "",
                state: "",
                pincode: "",
                quantity: 1
            });
            setErrors({});
        }
    }, [show]);

    if (!show || !vehicle) return null;

    const handleChange = (e) => {
        setForm({
            ...form,
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
        if (!form.customerName.trim()) tempErrors.customerName = "Name is required.";
        
        if (!form.email.trim()) {
            tempErrors.email = "Email is required.";
        } else if (!form.email.includes("@")) {
            tempErrors.email = "Please enter a valid email address.";
        }

        const phoneNum = form.phone.trim();
        if (!phoneNum) {
            tempErrors.phone = "Phone number is required.";
        } else if (!/^\d{10}$/.test(phoneNum)) {
            tempErrors.phone = "Phone must be a valid 10-digit number.";
        }

        if (!form.address.trim()) tempErrors.address = "Address is required.";
        if (!form.city.trim()) tempErrors.city = "City is required.";
        if (!form.state.trim()) tempErrors.state = "State is required.";

        const pinCodeStr = form.pincode.trim();
        if (!pinCodeStr) {
            tempErrors.pincode = "Pincode is required.";
        } else if (!/^\d{6}$/.test(pinCodeStr)) {
            tempErrors.pincode = "Pincode must be exactly 6 digits.";
        }

        const qtyNum = Number(form.quantity);
        if (!form.quantity || isNaN(qtyNum) || qtyNum < 1 || !Number.isInteger(qtyNum)) {
            tempErrors.quantity = "Quantity must be at least 1.";
        } else if (qtyNum > vehicle.quantity) {
            tempErrors.quantity = `Quantity cannot exceed available stock (${vehicle.quantity}).`;
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        onConfirm({
            ...form,
            vehicleId: vehicle.id,
            quantity: Number(form.quantity)
        });
    };

    return (
        <div 
            className="modal show d-block" 
            tabIndex="-1" 
            role="dialog" 
            style={{ backgroundColor: "rgba(0, 0, 0, 0.55)", backdropFilter: "blur(4px)", zIndex: 1050 }}
        >
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content border-0 shadow-lg" style={{ borderRadius: "16px" }}>
                    <div className="modal-header border-0 pt-4 px-4 pb-0">
                        <h5 className="modal-title fw-bold fs-4 text-primary d-flex align-items-center gap-2">
                            🛒 Purchase Invoice Details
                        </h5>
                        <button 
                            type="button" 
                            className="btn-close" 
                            aria-label="Close" 
                            onClick={onCancel}
                        />
                    </div>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="modal-body px-4 py-3">
                            <p className="text-secondary mb-4">
                                Complete the form to purchase <strong>{vehicle.make} {vehicle.model}</strong>. Price per unit: <strong>₹{vehicle.price.toLocaleString()}</strong>.
                            </p>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold text-secondary small mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        className={`form-control rounded-pill px-3 ${errors.customerName ? "is-invalid" : ""}`}
                                        name="customerName"
                                        placeholder="John Doe"
                                        value={form.customerName}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.customerName && <div className="invalid-feedback ps-2">{errors.customerName}</div>}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold text-secondary small mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        className={`form-control rounded-pill px-3 ${errors.email ? "is-invalid" : ""}`}
                                        name="email"
                                        placeholder="john.doe@example.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.email && <div className="invalid-feedback ps-2">{errors.email}</div>}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold text-secondary small mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        className={`form-control rounded-pill px-3 ${errors.phone ? "is-invalid" : ""}`}
                                        name="phone"
                                        placeholder="e.g. 9876543210"
                                        value={form.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.phone && <div className="invalid-feedback ps-2">{errors.phone}</div>}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold text-secondary small mb-1">Purchase Quantity</label>
                                    <input
                                        type="number"
                                        className={`form-control rounded-pill px-3 ${errors.quantity ? "is-invalid" : ""}`}
                                        name="quantity"
                                        placeholder="1"
                                        min="1"
                                        max={vehicle.quantity}
                                        value={form.quantity}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.quantity && <div className="invalid-feedback ps-2">{errors.quantity}</div>}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold text-secondary small mb-1">Shipping Address</label>
                                <input
                                    type="text"
                                    className={`form-control rounded-pill px-3 ${errors.address ? "is-invalid" : ""}`}
                                    name="address"
                                    placeholder="House No, Street Name, Locality"
                                    value={form.address}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.address && <div className="invalid-feedback ps-2">{errors.address}</div>}
                            </div>

                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label className="form-label fw-semibold text-secondary small mb-1">City</label>
                                    <input
                                        type="text"
                                        className={`form-control rounded-pill px-3 ${errors.city ? "is-invalid" : ""}`}
                                        name="city"
                                        placeholder="e.g. Mumbai"
                                        value={form.city}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.city && <div className="invalid-feedback ps-2">{errors.city}</div>}
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label className="form-label fw-semibold text-secondary small mb-1">State</label>
                                    <input
                                        type="text"
                                        className={`form-control rounded-pill px-3 ${errors.state ? "is-invalid" : ""}`}
                                        name="state"
                                        placeholder="e.g. Maharashtra"
                                        value={form.state}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.state && <div className="invalid-feedback ps-2">{errors.state}</div>}
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label className="form-label fw-semibold text-secondary small mb-1">Pincode</label>
                                    <input
                                        type="text"
                                        className={`form-control rounded-pill px-3 ${errors.pincode ? "is-invalid" : ""}`}
                                        name="pincode"
                                        placeholder="e.g. 400001"
                                        value={form.pincode}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.pincode && <div className="invalid-feedback ps-2">{errors.pincode}</div>}
                                </div>
                            </div>
                            
                            <div className="alert alert-secondary py-2 px-3 rounded-3 mt-2 d-flex justify-content-between align-items-center">
                                <span className="small text-muted fw-semibold">Estimated Total Price:</span>
                                <span className="fs-5 fw-bold text-success">
                                    ₹{(Number(form.quantity || 0) * vehicle.price).toLocaleString()}
                                </span>
                            </div>
                        </div>
                        <div className="modal-footer border-0 pb-4 px-4 pt-2 d-flex gap-2 justify-content-end">
                            <button 
                                type="button" 
                                className="btn btn-light rounded-pill px-4" 
                                onClick={onCancel}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="btn btn-primary rounded-pill px-4 fw-semibold"
                            >
                                Submit Order
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PurchaseModal;
