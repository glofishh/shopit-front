import React, { useState } from "react";


const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value);
  };

  const callSearchFunction = e => {
    e.preventDefault();
    routeToResults();
  };

  const routeToResults = () => {
  /**
  * Assign and replace look similar, but have a different constraints. The 
  * assign method loads the resource at the new URL and preserves the 
  * previous entry in the browser's navigation history.

  * This means the user can hit the back button and go to the original page.
  * The replace method does the same thing, except the original or 'current' 
  * resource is not retained in the browser's history.
  */
  window.location.assign(`/search/?search=${searchValue}`);
  }

  return (
    <div className="container-search">
      <form className="search">
        <span className="input-group-search">
          <div className="input-group input-group-md">
              <input
                type="text"
                className="form-control py-2 border rounded-0"
                value={searchValue}
                onChange={handleSearchInputChanges}
                placeholder=""
              />
              <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary border-left-0 border text-uppercase"
                    onClick={callSearchFunction}
                    type="submit"
                  >
                    <i className="fas fa-search"></i>
                </button>
              </div>
          </div>
        </span>
      </form>
    </div>
  );
};

export default SearchBar;
