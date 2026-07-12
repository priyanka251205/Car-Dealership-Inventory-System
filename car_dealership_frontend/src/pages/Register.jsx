import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import Toast from "../components/Toast";
import "../styles/Login.css";

function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
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
        if (form.name.trim().length < 2) {
            setValidationError("Full Name must be at least 2 characters long.");
            return false;
        }
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
            await register(form);

            setToast({ message: "Registration Successful! Redirecting to login...", type: "success" });
            setTimeout(() => {
                navigate("/");
            }, 1200);
        } catch (error) {
            console.error(error);
            const errMsg = error?.response?.data || 
                           error?.response?.data?.message || 
                           "Registration Failed";
            setToast({ message: errMsg, type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card-wrapper p-4 shadow border-0 rounded-4" style={{ maxWidth: "440px", width: "100%" }}>
                <div className="text-center mb-4">
                    <h2 className="fw-bold mb-1">Luxora Motors</h2>
                    <p className="text-secondary">Sign up to get access</p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    {validationError && (
                        <div className="alert alert-danger py-2 px-3 rounded-pill fs-7 mb-3 text-center" role="alert" style={{ fontSize: "0.85rem" }}>
                            ⚠️ {validationError}
                        </div>
                    )}

                    <div className="mb-3">
                        <label className="form-label fw-semibold text-secondary small">Full Name</label>
                        <input
                            type="text"
                            className="form-control rounded-pill px-3 py-2 border-secondary-subtle"
                            placeholder="John Doe"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

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
                            placeholder="Create password (min 6 chars)"
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
                        {loading ? "Registering..." : "Sign Up"}
                    </button>
                </form>

                <div className="text-center mt-3">
                    <span className="text-secondary small">Already have an account? </span>
                    <Link to="/" className="text-primary fw-semibold small text-decoration-none">
                        Sign In here
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

export default Register;