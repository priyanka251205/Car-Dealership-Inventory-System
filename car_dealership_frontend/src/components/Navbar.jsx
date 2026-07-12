import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top modern-navbar">
            <div className="container">
                <div
                    className="navbar-brand d-flex align-items-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/dashboard")}
                >
                    <span className="fs-3 me-2 logo-icon">🚗</span>
                    <div className="brand-text">
                        <div className="fw-bold fs-4 branding-title">
                            Car Dealership
                        </div>
                        <small className="branding-subtitle text-muted">
                            Inventory System
                        </small>
                    </div>
                </div>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
                    <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0 navbar-actions">
                        {name && (
                            <span className="text-light-50 me-2 d-none d-sm-inline">
                                Welcome, <strong className="text-white">{name}</strong> ({role})
                            </span>
                        )}
                        {role === "ADMIN" && (
                            <button
                                className="btn btn-success rounded-pill px-4"
                                onClick={() => navigate("/add-vehicle")}
                            >
                                + Add Vehicle
                            </button>
                        )}
                        <button
                            className="btn btn-outline-light rounded-pill px-4"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;