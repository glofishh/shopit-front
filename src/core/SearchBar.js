import React, { useReducer, useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import { API } from "../config";

const initialState = {
  loading: true,
  items: [],
  errorMessage: null
};

const reducer = (state, action) => {
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
  const [redirect, setRedirect] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [data, setData] = useState({
    categories: [],
    category: '',
    results: [],
    searched: false
  });
  const { results, searched } = data; //removed search

  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value);
  };

  const search = searchValue => {
    dispatch({
      type: "PRODUCT_SEARCH_REQUEST"
    });
    // ${API}/products/search?search=cotton
    fetch(`${API}/products/search?search=${searchValue}`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "False") {
          console.log(jsonResponse.Error);
        } else {
          setData({ ...data, results: jsonResponse, searched: true });
        };
      });
      console.log('new results ' + results.length)
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = e => {
    e.preventDefault();
    search(searchValue);
    resetInputField();
    console.log('results in callsearch function' + results);
    shouldRedirect(true);
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return {results} && <Redirect
                to={{
                  pathname: "/search",
                  search: `?search=${searchValue}`,
                  state: { referrer: results }
                }}
              /> && <Link to='/search' />;
              }
  };

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