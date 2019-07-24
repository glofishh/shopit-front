import React, { useState } from "react";
// import { Redirect } from 'react-router-dom';


const SearchBar = ({ search }) => {
  const [searchValue, setSearchValue] = useState("");
  // const [redirect, setRedirect] = useState(false);

  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value);
  };

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

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = e => {
    e.preventDefault();
    search(searchValue);
    resetInputField();
    // setRedirect(true);
  };

  // const shouldRedirect = redirect => {
  //   if (redirect) {
  //     return <Redirect to="/shop/search" />;
  //   }
  // };

  return (
    <div className="container-search mt-1">
      <form className="search">
        <span className="input-group-search">
          <div className="input-group input-group-md">
          {/* {shouldRedirect(redirect)} */}


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