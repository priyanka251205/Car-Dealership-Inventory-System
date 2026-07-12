import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import "../styles/Login.css";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
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

            await register(form);

            alert("Registration Successful");

            navigate("/");

        } catch (error) {

            alert(
                error?.response?.data ||
                "Registration Failed"
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

                    <p>Create Account</p>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            placeholder="Full Name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />

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

                            {
                                loading
                                    ? "Registering..."
                                    : "Register"
                            }

                        </button>

                    </form>

                    <div className="register-link">

                        Already have an account?

                        <Link to="/">

                            Login

                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;