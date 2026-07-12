import Navbar from "../components/Navbar";

function Profile() {
    const name = localStorage.getItem("name") || "N/A";
    const email = localStorage.getItem("email") || "user@dealership.com";
    const role = localStorage.getItem("role") || "USER";

    return (
        <>
            <Navbar />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card border-0 shadow-sm rounded-4">
                            <div className="card-body p-5 text-center">
                                <div className="avatar bg-primary-subtle text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: "90px", height: "90px" }}>
                                    <span className="fs-1 fw-bold">👤</span>
                                </div>
                                <h3 className="fw-bold text-dark mb-1">{name}</h3>
                                <p className="text-muted mb-4">{role} Account</p>
                                
                                <div className="text-start border-top pt-4">
                                    <div className="mb-3">
                                        <label className="text-secondary small fw-semibold uppercase mb-1">Email Address</label>
                                        <div className="text-dark fw-medium fs-6">{email}</div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="text-secondary small fw-semibold uppercase mb-1">Assigned Role</label>
                                        <div>
                                            <span className={`badge px-3 py-2 rounded-pill fs-7 ${role === "ADMIN" ? "bg-danger-subtle text-danger" : "bg-primary-subtle text-primary"}`}>
                                                {role}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-secondary small fw-semibold uppercase mb-1">Account Status</label>
                                        <div className="text-success fw-medium fs-6 d-flex align-items-center gap-1">
                                            🟢 Active
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
