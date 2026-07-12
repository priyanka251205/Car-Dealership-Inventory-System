import { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";
import { getPurchaseHistory } from "../services/vehicleService";

function AdminPurchaseHistory() {
    const [history, setHistory] = useState([]);
    const [filteredHistory, setFilteredHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({ message: "", type: "" });

    // Search and Sort
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState("purchaseDate");
    const [sortOrder, setSortOrder] = useState("desc");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const showToast = useCallback((message, type = "success") => {
        setToast({ message, type });
    }, []);

    const fetchHistory = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getPurchaseHistory();
            setHistory(response.data || []);
            setFilteredHistory(response.data || []);
        } catch (error) {
            console.error(error);
            showToast("Failed to load purchase history records.", "error");
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    // Handle Search and Filter
    useEffect(() => {
        let result = [...history];

        // Search text filter
        if (searchTerm.trim() !== "") {
            const term = searchTerm.toLowerCase();
            result = result.filter(
                h => 
                    h.customerName?.toLowerCase().includes(term) ||
                    h.email?.toLowerCase().includes(term) ||
                    h.vehicle?.make?.toLowerCase().includes(term) ||
                    h.vehicle?.model?.toLowerCase().includes(term) ||
                    h.purchasedByUser?.email?.toLowerCase().includes(term)
            );
        }

        // Sorting
        result.sort((a, b) => {
            let valA, valB;
            if (sortField === "vehicle") {
                valA = `${a.vehicle?.make} ${a.vehicle?.model}`;
                valB = `${b.vehicle?.make} ${b.vehicle?.model}`;
            } else if (sortField === "purchasedBy") {
                valA = a.purchasedByUser?.email || a.purchasedByUser?.name || "";
                valB = b.purchasedByUser?.email || b.purchasedByUser?.name || "";
            } else {
                valA = a[sortField];
                valB = b[sortField];
            }

            if (valA < valB) return sortOrder === "asc" ? -1 : 1;
            if (valA > valB) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });

        setFilteredHistory(result);
        setCurrentPage(1); // Reset page on filter
    }, [history, searchTerm, sortField, sortOrder]);

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    // Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredHistory.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);

    // Export to CSV
    const exportToCSV = () => {
        if (filteredHistory.length === 0) {
            showToast("No data available to export.", "warning");
            return;
        }

        const headers = [
            "Purchase ID", 
            "Vehicle (Make & Model)", 
            "Customer Name", 
            "Email Address", 
            "Phone Number", 
            "Address Details",
            "City",
            "State",
            "Pincode",
            "Quantity Purchased", 
            "Purchase Date", 
            "Purchase Time", 
            "Purchased By Account"
        ];

        const rows = filteredHistory.map(h => [
            h.id,
            `${h.vehicle?.make} ${h.vehicle?.model}`,
            h.customerName,
            h.email,
            h.phone,
            `"${h.address.replace(/"/g, '""')}"`,
            h.city,
            h.state,
            h.pincode,
            h.quantity,
            h.purchaseDate,
            h.purchaseTime,
            h.purchasedByUser?.email || h.purchasedByUser?.name || "N/A"
        ]);

        const csvContent = "data:text/csv;charset=utf-8," 
            + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
        const encodedUri = encodeURI(csvContent);
        
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `Dealership_Purchase_History_${new Date().toISOString().slice(0,10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showToast("CSV file exported successfully!", "success");
    };

    return (
        <>
            <Navbar />
            <div className="container py-5">
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4">
                    <div>
                        <h2 className="fw-bold text-dark mb-1">📋 Purchase Ledger Logs</h2>
                        <p className="text-secondary mb-0">Review client invoices, delivery coordinates, and transaction logs.</p>
                    </div>
                    <button 
                        className="btn btn-outline-success rounded-pill px-4 fw-semibold d-flex align-items-center gap-2 shadow-sm"
                        onClick={exportToCSV}
                    >
                        📥 Export to CSV
                    </button>
                </div>

                <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body p-4">
                        {/* Filters Panel */}
                        <div className="row mb-4 align-items-center">
                            <div className="col-md-6 col-lg-8">
                                <input
                                    type="text"
                                    className="form-control rounded-pill px-3 shadow-sm border-secondary-subtle"
                                    placeholder="🔍 Search by customer name, email, or car make/model..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary mb-3" role="status" />
                                <h5 className="text-secondary fw-semibold">Loading purchase logs...</h5>
                            </div>
                        ) : filteredHistory.length === 0 ? (
                            <div className="text-center py-5">
                                <span className="fs-1 d-block mb-3">📁</span>
                                <h4 className="fw-bold text-dark">No Transactions Found</h4>
                                <p className="text-muted mb-0">We couldn't locate any matching transaction logs in the database.</p>
                            </div>
                        ) : (
                            <>
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle">
                                        <thead className="table-light border-0">
                                            <tr>
                                                <th className="cursor-pointer py-3" onClick={() => handleSort("id")} style={{ cursor: "pointer" }}>
                                                    ID {sortField === "id" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                                                </th>
                                                <th className="cursor-pointer py-3" onClick={() => handleSort("vehicle")} style={{ cursor: "pointer" }}>
                                                    Vehicle {sortField === "vehicle" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                                                </th>
                                                <th className="cursor-pointer py-3" onClick={() => handleSort("customerName")} style={{ cursor: "pointer" }}>
                                                    Customer Name {sortField === "customerName" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                                                </th>
                                                <th className="cursor-pointer py-3" onClick={() => handleSort("email")} style={{ cursor: "pointer" }}>
                                                    Customer Email {sortField === "email" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                                                </th>
                                                <th className="py-3">Phone</th>
                                                <th className="cursor-pointer py-3 text-center" onClick={() => handleSort("quantity")} style={{ cursor: "pointer" }}>
                                                    Qty {sortField === "quantity" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                                                </th>
                                                <th className="cursor-pointer py-3" onClick={() => handleSort("purchaseDate")} style={{ cursor: "pointer" }}>
                                                    Date & Time {sortField === "purchaseDate" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                                                </th>
                                                <th className="cursor-pointer py-3" onClick={() => handleSort("purchasedBy")} style={{ cursor: "pointer" }}>
                                                    Processed By {sortField === "purchasedBy" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                                                </th>
                                                <th className="py-3 text-center">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems.map((item) => (
                                                <tr key={item.id}>
                                                    <td className="fw-semibold">#{item.id}</td>
                                                    <td>
                                                        <div className="fw-semibold text-dark">{item.vehicle?.make} {item.vehicle?.model}</div>
                                                        <small className="text-secondary">{item.vehicle?.category}</small>
                                                    </td>
                                                    <td>{item.customerName}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.phone}</td>
                                                    <td className="text-center fw-bold">{item.quantity}</td>
                                                    <td>
                                                        <div className="fw-medium text-dark">{item.purchaseDate}</div>
                                                        <small className="text-secondary">{item.purchaseTime?.slice(0, 5)}</small>
                                                    </td>
                                                    <td className="small text-muted">{item.purchasedByUser?.email || item.purchasedByUser?.name || "N/A"}</td>
                                                    <td className="text-center">
                                                        <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill fw-semibold">
                                                            Completed
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination Controls */}
                                {totalPages > 1 && (
                                    <div className="d-flex justify-content-between align-items-center mt-4">
                                        <div className="text-muted small">
                                            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredHistory.length)} of {filteredHistory.length} logs
                                        </div>
                                        <nav>
                                            <ul className="pagination pagination-sm mb-0">
                                                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                                    <button className="page-link rounded-start-pill px-3" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                                                        Prev
                                                    </button>
                                                </li>
                                                {[...Array(totalPages).keys()].map(page => (
                                                    <li key={page + 1} className={`page-item ${currentPage === page + 1 ? "active" : ""}`}>
                                                        <button className="page-link px-3" onClick={() => setCurrentPage(page + 1)}>
                                                            {page + 1}
                                                        </button>
                                                    </li>
                                                ))}
                                                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                                    <button className="page-link rounded-end-pill px-3" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>
                                                        Next
                                                    </button>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ message: "", type: "" })}
            />
        </>
    );
}

export default AdminPurchaseHistory;
