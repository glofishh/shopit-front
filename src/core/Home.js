import React, { useState, useEffect } from 'react';
import LayoutHome from './LayoutHome';
import { getProducts } from './apiCore';
import Card from './Card';


const Home = () => {
  const [productsBySell, setProductsbySell] = useState([]);
  const [productsByArrival, setProductsbyArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts('sold').then(data => {
      if(data.error) {
        setError(data.error)
      } else {
        setProductsbySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts('createdAt').then(data => {
      if(data.error) {
        setError(data.error)
      } else {
        setProductsbyArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, [])

  return (
    <LayoutHome
        title="Home Page"
        description="Shopit E-commerce App"
        className="homepage-container col-8"
    >

        <h2 className="menu-header text-uppercase mb-3">new arrivals<hr /></h2>
        <div className="row">

            {productsByArrival.map((product, i) => (
                <div key={i} className="col-3 mb-3">
                    <Card product={product} />
                </div>
            ))}
        </div>

        <h2 className="menu-header text-uppercase mb-3">best sellers<hr /></h2>
        <div className="row">
            {productsBySell.map((product, i) => (
                <div key={i} className="col-3 mb-3">
                    <Card product={product} />
                </div>
            ))}
        </div>
    </LayoutHome>
  );
};

export default Home;