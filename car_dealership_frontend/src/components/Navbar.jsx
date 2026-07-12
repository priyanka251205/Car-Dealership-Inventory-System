import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        navigate("/");
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top modern-navbar">
            <div className="container">
                <div
                    className="navbar-brand d-flex align-items-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/dashboard")}
                >
                    <div className="brand-text">
                        <div className="fw-bold fs-4 branding-title">
                            Luxora Motors
                        </div>
                        <small className="branding-subtitle text-muted">
                            Inventory Management
                        </small>
                    </div>
                </div>

                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4 gap-2">
                        <li className="nav-item">
                            <span
                                className={`nav-link px-3 py-2 rounded-3 cursor-pointer ${isActive("/dashboard") ? "active-link text-white fw-bold" : "text-light-50"}`}
                                onClick={() => navigate("/dashboard")}
                                style={{ cursor: "pointer" }}
                            >
                                Dashboard
                            </span>
                        </li>
                        {role === "ADMIN" && (
                            <>
                                <li className="nav-item">
                                    <span
                                        className={`nav-link px-3 py-2 rounded-3 cursor-pointer ${isActive("/purchase-history") ? "active-link text-white fw-bold" : "text-light-50"}`}
                                        onClick={() => navigate("/purchase-history")}
                                        style={{ cursor: "pointer" }}
                                    >
                                        Purchase History
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <span
                                        className={`nav-link px-3 py-2 rounded-3 cursor-pointer ${isActive("/add-vehicle") ? "active-link text-white fw-bold" : "text-light-50"}`}
                                        onClick={() => navigate("/add-vehicle")}
                                        style={{ cursor: "pointer" }}
                                    >
                                        Add Vehicle
                                    </span>
                                </li>
                            </>
                        )}
                        <li className="nav-item">
                            <span
                                className={`nav-link px-3 py-2 rounded-3 cursor-pointer ${isActive("/profile") ? "active-link text-white fw-bold" : "text-light-50"}`}
                                onClick={() => navigate("/profile")}
                                style={{ cursor: "pointer" }}
                            >
                                Profile
                            </span>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center gap-3 navbar-actions mt-3 mt-lg-0">
                        {name && (
                            <span className="text-light opacity-75 d-none d-xl-inline small">
                                Signed in as: <strong className="text-white">{name}</strong>
                            </span>
                        )}
                        <button
                            className="btn btn-outline-light rounded-pill px-4 logout-btn"
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