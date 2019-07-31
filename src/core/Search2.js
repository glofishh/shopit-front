import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: '',
    search: '',
    results: [],
    searched: false
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    //console.log(search, category);
    if (search) {
      list({ search: search || undefined, category: category })
      .then(response => {
        if (response.error) {
          console.log(response.error);
        } else {
          setData({ ...data, results: response, searched: true });
        };
        console.log('**SEARCHJS** ' + typeof results);
      });
    };
  };

  const searchSubmit = e => {
    e.preventDefault();
    searchData();
  };

  const handleChange = name => event => {
    setData({ ...data, [name]: event.target.value, searched: false });
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
          <h2 className="row">
            {searchMessage(searched, results)}
          </h2>
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

  const searchForm = () => (

      <form onSubmit={searchSubmit}>
        <span className="input-group">
          <div className="input-group input-group-md" style={{width: "500px"}}>
            <div className="input-group-prepend">
              <div className="input-group-text bg-transparent border-right-0 rounded-0">
            
                <select
                  className="btn mr-2"
                  onChange={handleChange('category')}
                >
                  <option value="all">Search All</option>
                  {categories.map((c, i) => (
                    <option key={i} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

              <input
                type="search"
                className="form-control py-2 border-left-0 border rounded-0"
                onChange={handleChange('search')}
                placeholder=""
              />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary border-left-0 border text-uppercase" type="button">
                  <i className="fas fa-search"></i>
                </button>
              </div>
          </div>
        </span>
      </form>
    );
    return (
      <div className="row">
        <div className="container-search mb-3 ml-2">{searchForm()}</div>
        <div className="container-search mb-3">
          {searchedProducts(results)}
        </div>
      </div>
    );
};

export default Search;

  // const shouldRedirect = redirect => {
  //   if (redirect) {
  //     return <Redirect to="/shop/search" />;
  //   }
  // };
