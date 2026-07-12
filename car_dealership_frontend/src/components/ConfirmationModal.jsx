function ConfirmationModal({ show, title, message, onConfirm, onCancel }) {
    if (!show) return null;

    return (
        <>
            <div 
                className="modal show d-block" 
                tabIndex="-1" 
                role="dialog" 
                style={{ backgroundColor: "rgba(0, 0, 0, 0.55)", backdropFilter: "blur(4px)" }}
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content border-0 shadow-lg" style={{ borderRadius: "16px" }}>
                        <div className="modal-header border-0 pt-4 px-4 pb-0">
                            <h5 className="modal-title fw-bold fs-4 text-danger d-flex align-items-center gap-2">
                                ⚠️ {title || "Confirm Action"}
                            </h5>
                            <button 
                                type="button" 
                                className="btn-close" 
                                aria-label="Close" 
                                onClick={onCancel}
                            />
                        </div>
                        <div className="modal-body px-4 py-3">
                            <p className="text-secondary fs-6 mb-0">
                                {message || "Are you sure you want to proceed?"}
                            </p>
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
                                type="button" 
                                className="btn btn-danger rounded-pill px-4" 
                                onClick={onConfirm}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConfirmationModal;
