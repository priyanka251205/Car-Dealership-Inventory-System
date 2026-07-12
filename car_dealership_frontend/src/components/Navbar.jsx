import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };

    return (

        <nav className="navbar navbar-dark bg-dark">

            <div className="container">

                <span className="navbar-brand fw-bold">

                    🚗 Car Inventory

                </span>

                <button
                    className="btn btn-warning"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </nav>

    );

}

export default Navbar;