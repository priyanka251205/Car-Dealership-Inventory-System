import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const logout = () => {

        localStorage.clear();

        navigate("/");

    };

    return (

        <nav className="navbar navbar-dark bg-dark">

            <div className="container">

                <span
                    className="navbar-brand fw-bold"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/dashboard")}
                >
                    🚗 Car Inventory
                </span>

                <div>

                    {role === "ADMIN" && (

                        <button
                            className="btn btn-success me-2"
                            onClick={() => navigate("/add-vehicle")}
                        >
                            Add Vehicle
                        </button>

                    )}

                    <button
                        className="btn btn-warning"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;