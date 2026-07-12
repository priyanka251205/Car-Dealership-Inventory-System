import { useState } from "react";

function SearchBar({ onSearch }) {
    const [keyword, setKeyword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(keyword);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="card border-0 shadow-sm p-3 mb-4 search-bar-container"
        >
            <div className="row g-2 align-items-center">
                <div className="col-md-10 position-relative">
                    <input
                        className="form-control form-control-lg rounded-pill ps-4 search-input"
                        placeholder="🔍 Search vehicles by make..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>
                <div className="col-md-2">
                    <button
                        type="submit"
                        className="btn btn-primary btn-lg rounded-pill w-100 search-button"
                    >
                        Search
                    </button>
                </div>
            </div>
        </form>
    );
}

export default SearchBar;