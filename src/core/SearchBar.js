import React, { useReducer, useEffect, useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import { API } from "../config";
import queryString from 'query-string';

const initialState = {
  loading: true,
  items: [],
  errorMessage: null
};

const reducer = (state, action, match, location) => {
  switch (action.type) {
    case "SEARCH_PRODUCTS_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_PRODUCTS_SUCCESS":
      return {
        ...state,
        loading: false,
        PRODUCTS: action.payload
      };
    case "SEARCH_PRODUCTS_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [mounted, setMounted] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [data, setData] = useState({
    results: [],
    searched: false,
    search: ''
  });
  const [toResults, setToResults] = useState(false);
  const { results, searched, search } = data; //removed search

  useEffect(() => {
  }, []);


  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value);
  };

  const fetchSearch = searchValue => {
    dispatch({
      type: "PRODUCT_SEARCH_REQUEST"
    });
    // ${API}/products/search?search=cotton
    // fetch(`${API}/products/search?search=cotton`)
    fetch(`${API}/products/search?search=${searchValue}`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "False") {
          console.log(jsonResponse.Error);
        } else {
          setData({ ...data, results: jsonResponse, searched: true, search: searchValue });
        };
      });
      console.log('new results ' + results.length, search)
  };

  const resetInputField = () => {
    setSearchValue(searchValue);
  };

  const callSearchFunction = e => {
    e.preventDefault();
    // console.log('***LOCATION IN RESULTS*** ' + window.location.search)
    // console.log(JSON.stringify(window.location));
    // console.log(queryString.parse(window.location.search));
    // const values = queryString.parse(window.location.search);
    // console.log('search string is ' + values.search)
    // setData({searched: true, term:[values.search]})

    // search(searchValue);
    resetInputField();
    setToResults(true);

    // shouldRedirect(true);
  };

  // const shouldRedirect = redirect => {
  //   if (redirect) {
  //     return <Redirect to={{
  //               pathname: "/search",
  //               search: `?search=${searchValue}`,
  //               state: { referrer: results }
  //             }}
  //           />;
  //   }
  // };

  return (
    <div className="container-search">
      {toResults ? <Redirect to={`/search/?search=${searchValue}`} /> : null}
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
