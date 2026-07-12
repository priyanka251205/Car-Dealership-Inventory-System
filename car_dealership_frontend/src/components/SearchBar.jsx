import { useState } from "react";

function SearchBar({ onSearch }) {

  const [keyword, setKeyword] = useState("");

  const search = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <form onSubmit={search} className="row">

      <div className="col-md-10">

        <input
          className="form-control"
          placeholder="Search by Make..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

      </div>

      <div className="col-md-2">

        <button className="btn btn-primary w-100">
          Search
        </button>

      </div>

    </form>
  );
}

export default SearchBar;