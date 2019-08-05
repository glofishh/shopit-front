import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";


const Card = ({ 
  product
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);


  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };


  return (
    <div className="card-group">
      <div className="card">
        <div className="card-body">
        {shouldRedirect(redirect)}
          <Link to={`/product/${product._id}`}>
            <ShowImage item={product} url="product" />
          </Link>
            <div className="black-5 text-uppercase">
              <Link to={`/product/${product._id}`}>
                {product.name}
              </Link>
            </div>
            <p className="lead">
              <Link to={`/product/${product._id}`}>
                {product.description.substring(0, 50)}...
              </Link>
              <br />
              ${product.price}
            </p>
        </div>
      </div>
    </div>
  );
};

export default Card;