function SearchBar({ value, onChange, onSearch }) {

    return (

        <div className="row mb-4">

            <div className="col-md-10">

                <input

                    className="form-control"

                    placeholder="Search By Make"

                    value={value}

                    onChange={onChange}

                />

            </div>

            <div className="col-md-2">

                <button

                    className="btn btn-primary w-100"

                    onClick={onSearch}

                >

                    Search

                </button>

            </div>

        </div>

    );

}

export default SearchBar;