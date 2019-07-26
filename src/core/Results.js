import React, { useReducer, useState } from "react";
import Layout from "./Layout";
import Card from "./Card";
import SearchBar from "./SearchBar";
// import { API } from "../config";


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

const Results = ({ search }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [data, setData] = useState({
    categories: [],
    category: '',
    results: [],
    searched: false
  });
  const { results, searched } = data; //removed search
  const [limit, setLimit] = useState(8);
  const [size, setSize] = useState(0);

  // const search = searchValue => {
  //   dispatch({
  //     type: "PRODUCT_SEARCH_REQUEST"
  //   });
  //   // ${API}/products/search?search=cotton
  //   fetch(`${API}/products/search?search=${searchValue}`)
  //     .then(response => response.json())
  //     .then(jsonResponse => {
  //       if (jsonResponse.Response === "False") {
  //         console.log(jsonResponse.Error);
  //       } else {
  //         setData({ ...data, results: jsonResponse, searched: true });
  //       };
  //     });
  // };


  const loadMore = () => {
    setSize(results.length);
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <div className="mb-5 text-uppercase" onClick={loadMore}>
          <h5>load more</h5>
        </div>
      )
    );
  };


  const searchMessage = (searched, results) => {
    if (searched && results.length === 1) {
      return `Your search returned ${results.length} product`;
    }
    if (searched && results.length > 0) {
      return `Your search returned ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return `No products found`;
    }
  };


  const searchedProducts = (results = []) => {
    return (

      <div>
          <h4 className="row text-uppercase mt-3">
            {searchMessage(searched, results)}
          </h4>
          <div className="row">
            {results.map((product, i) => (
              <div className="col-4 mb-3">
                <Card key={i} product={product} />
              </div>
            ))}
              </div>
          </div>
    );
  };

  return (
    <Layout
        title="shop page"
        description="browse through items"
        className="container"
        >

        <div className="row">
          <div className="col-3 mb-3">
            <h4> </h4>

            <h4> </h4>
            <div>

            </div>
          </div>

          <div className="col-8">
            <div className="row">
              <h2 className="row text-uppercase mt-3">Product search</h2>
            </div>
            <div className="row">
              <SearchBar search={search} />
            </div>
              <div className="row">
                {searchedProducts(results)}
              </div>
            {loadMoreButton()}
            <hr />  
          </div>
          
        </div>
    </Layout>
  );
};

export default Results;