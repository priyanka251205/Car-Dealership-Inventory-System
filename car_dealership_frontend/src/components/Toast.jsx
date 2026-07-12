import { useEffect } from "react";

function Toast({ message, type, onClose }) {
    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [message, onClose]);

    if (!message) return null;

    let bgClass = "bg-primary";
    let icon = "ℹ️";
    if (type === "success") {
        bgClass = "bg-success";
        icon = "✅";
    } else if (type === "warning") {
        bgClass = "bg-warning text-dark";
        icon = "⚠️";
    } else if (type === "error") {
        bgClass = "bg-danger";
        icon = "❌";
    }

    return (
        <div 
            className="toast-container position-fixed bottom-0 end-0 p-3" 
            style={{ zIndex: 1100 }}
        >
            <div 
                className={`toast show align-items-center text-white ${bgClass} border-0 shadow-lg`} 
                role="alert" 
                aria-live="assertive" 
                aria-atomic="true"
                style={{ borderRadius: "12px", minWidth: "250px" }}
            >
                <div className="d-flex">
                    <div className="toast-body d-flex align-items-center gap-2">
                        <span className="fs-5">{icon}</span>
                        <div className="fw-semibold">{message}</div>
                    </div>
                    <button 
                        type="button" 
                        className={`btn-close ${type !== "warning" ? "btn-close-white" : ""} me-2 m-auto`} 
                        onClick={onClose} 
                        aria-label="Close"
                    />
                </div>
            </div>
        </div>
    );
}

export default Toast;
