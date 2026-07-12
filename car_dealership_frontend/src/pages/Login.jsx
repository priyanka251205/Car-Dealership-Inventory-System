import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";
import Toast from "../components/Toast";
import "../styles/Login.css";

function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ message: "", type: "" });
    const [validationError, setValidationError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        setValidationError("");
    };

    const validateForm = () => {
        if (!form.email.includes("@")) {
            setValidationError("Please enter a valid email address.");
            return false;
        }
        if (form.password.length < 6) {
            setValidationError("Password must be at least 6 characters long.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await login(form);

            localStorage.setItem("token", response.token);
            localStorage.setItem("role", response.role);
            localStorage.setItem("name", response.name);

            setToast({ message: "Login Successful! Redirecting...", type: "success" });
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);
        } catch (error) {
            console.error(error);
            const errMsg = error?.response?.data?.message || 
                           error?.response?.data || 
                           "Invalid Email or Password";
            setToast({ message: errMsg, type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page bg-light d-flex align-items-center justify-content-center min-vh-100">
            <div className="login-card-wrapper p-4 bg-white shadow border-0 rounded-4" style={{ maxWidth: "440px", width: "100%" }}>
                <div className="text-center mb-4">
                    <span className="fs-1 d-inline-block mb-2">🚗</span>
                    <h2 className="fw-bold text-dark mb-1">Car Dealership</h2>
                    <p className="text-secondary">Sign in to manage inventory</p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    {validationError && (
                        <div className="alert alert-danger py-2 px-3 rounded-pill fs-7 mb-3 text-center" role="alert" style={{ fontSize: "0.85rem" }}>
                            ⚠️ {validationError}
                        </div>
                    )}

                    <div className="mb-3">
                        <label className="form-label fw-semibold text-secondary small">Email Address</label>
                        <input
                            type="email"
                            className="form-control rounded-pill px-3 py-2 border-secondary-subtle"
                            placeholder="name@dealership.com"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-semibold text-secondary small">Password</label>
                        <input
                            type="password"
                            className="form-control rounded-pill px-3 py-2 border-secondary-subtle"
                            placeholder="Enter password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-lg w-100 rounded-pill py-2 fs-6 fw-semibold shadow-sm mb-3"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                        ) : null}
                        {loading ? "Logging In..." : "Sign In"}
                    </button>
                </form>

                <div className="text-center mt-3">
                    <span className="text-secondary small">Don't have an account? </span>
                    <Link to="/register" className="text-primary fw-semibold small text-decoration-none">
                        Register here
                    </Link>
                </div>
            </div>

            <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ message: "", type: "" })}
            />
        </div>
    );
}

export default Login;