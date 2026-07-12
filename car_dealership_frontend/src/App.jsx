import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddVehicle from "./pages/AddVehicle";
import EditVehicle from "./pages/EditVehicle";
import VehicleDetails from "./pages/VehicleDetails";
import AdminPurchaseHistory from "./pages/AdminPurchaseHistory";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>

                        <Dashboard />

                    </ProtectedRoute>
                }
            />

            <Route
                path="/add-vehicle"
                element={
                    <ProtectedRoute role="ADMIN">

                        <AddVehicle />

                    </ProtectedRoute>
                }
            />

            <Route
                path="/edit-vehicle/:id"
                element={
                    <ProtectedRoute role="ADMIN">

                        <EditVehicle />

                    </ProtectedRoute>
                }
            />

            <Route
                path="/vehicle/:id"
                element={
                    <ProtectedRoute>

                        <VehicleDetails />

                    </ProtectedRoute>
                }
            />

            <Route
                path="/purchase-history"
                element={
                    <ProtectedRoute role="ADMIN">

                        <AdminPurchaseHistory />

                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>

                        <Profile />

                    </ProtectedRoute>
                }
            />

        </Routes>

    );

}

export default App;