import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";
import "../styles/Login.css";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const response = await login(form);

            localStorage.setItem("token", response.token);
            localStorage.setItem("role", response.role);
            localStorage.setItem("name", response.name);

            alert("Login Successful");

            navigate("/dashboard");

        } catch (error) {

            alert(
                error?.response?.data?.message ||
                "Invalid Email or Password"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-container">

            <div className="login-overlay">

                <div className="login-card">

                    <h1>🚗 Car Inventory</h1>

                    <p>
                        Welcome Back
                    </p>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />

                        <button
                            type="submit"
                            disabled={loading}
                        >

                            {loading
                                ? "Logging In..."
                                : "Login"}

                        </button>

                    </form>

                    <div className="register-link">

                        Don't have an account?

                        <Link to="/register">

                            Register

                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;