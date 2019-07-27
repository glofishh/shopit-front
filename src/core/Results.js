import React, { useReducer, useEffect, useState } from "react";
import Layout from "./Layout";
import Card from "./Card";
import Search2 from "./Search2";


const Results = ({ search }) => {
  const [data, setData] = useState({
    results: [],
    searched: false,
    term: ''
  });
  const { results, searched } = data; //removed search
  const [limit, setLimit] = useState(8);
  const [size, setSize] = useState(0);

useEffect(() => {
}, [])


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
              <Search2 search={search} />
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