import React, { useReducer, useEffect, useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import { API } from "../config";


const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [data, setData] = useState({
    results: [],
    searched: false,
    search: ''
  });
  const [toResults, setToResults] = useState(false);
  const { results, searched, search } = data;

  useEffect(() => {
  }, []);


  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue(searchValue);
  };

  const callSearchFunction = e => {
    e.preventDefault();
    resetInputField();
    routeToResults();
  };

  const routeToResults = () => {
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
