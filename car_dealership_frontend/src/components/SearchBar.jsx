import { useState } from "react";

function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex">

      <input
        className="form-control me-2"
        placeholder="Search by Make"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <button
        className="btn btn-primary"
      >
        Search
      </button>

    </form>
  );
}

export default SearchBar;