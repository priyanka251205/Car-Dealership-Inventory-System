import { useState } from "react";

function RestockModal({ show, vehicle, onConfirm, onCancel }) {
    const [quantity, setQuantity] = useState("");
    const [error, setError] = useState("");

    if (!show || !vehicle) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const numQty = Number(quantity);
        if (!quantity || isNaN(numQty) || numQty <= 0 || !Number.isInteger(numQty)) {
            setError("Please enter a valid positive whole number.");
            return;
        }

        setError("");
        onConfirm(vehicle.id, numQty);
    };

    return (
        <div 
            className="modal show d-block" 
            tabIndex="-1" 
            role="dialog" 
            style={{ backgroundColor: "rgba(0, 0, 0, 0.55)", backdropFilter: "blur(4px)" }}
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content border-0 shadow-lg" style={{ borderRadius: "16px" }}>
                    <div className="modal-header border-0 pt-4 px-4 pb-0">
                        <h5 className="modal-title fw-bold fs-4 text-primary d-flex align-items-center gap-2">
                            📦 Restock Vehicle
                        </h5>
                        <button 
                            type="button" 
                            className="btn-close" 
                            aria-label="Close" 
                            onClick={onCancel}
                        />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body px-4 py-3">
                            <p className="text-secondary mb-3">
                                Restocking <strong>{vehicle.make} {vehicle.model}</strong>. Current quantity: <span className="badge bg-secondary">{vehicle.quantity}</span>.
                            </p>
                            <div className="mb-2">
                                <label htmlFor="restockQuantity" className="form-label fw-semibold text-dark">
                                    Restock Quantity
                                </label>
                                <input
                                    type="number"
                                    className={`form-control rounded-pill px-3 ${error ? "is-invalid" : ""}`}
                                    id="restockQuantity"
                                    placeholder="Enter positive integer (e.g. 5)"
                                    value={quantity}
                                    onChange={(e) => {
                                        setQuantity(e.target.value);
                                        if (e.target.value) setError("");
                                    }}
                                    min="1"
                                    required
                                />
                                {error && (
                                    <div className="invalid-feedback ps-2">
                                        {error}
                                    </div>
                                )}
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
                                className="btn btn-warning rounded-pill px-4 text-dark fw-semibold"
                            >
                                Restock
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RestockModal;
