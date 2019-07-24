import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';


const ProductDetails = ({ 
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);


  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2">
            view product
          </button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };


  const showAddToCart = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className="btn btn-add text-uppercase"
        >
          add to cart
        </button>
      )
    );
  };

  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => removeItem(product._id)}
          className="btn btn-outline-danger mt-2 mb-2"
        >
            remove item
        </button>
      )
    );
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">in stock</span>
    ) : (
      <span className="badge badge-primary badge-pill">currently out of stock</span>
    );
  };

  const handleChange = productId => event => {
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value)
    }
  }

  const showCartUpdateOptions = cartUpdate => {
    return cartUpdate && <div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">adjust quantity</span>
        </div>
        <input type="number" className="form-control" value={count} onChange={handleChange(product._id)}/>
      </div>
    </div>;
  };

  return (
    <div className="details-group">
      <div className="details">
        {/* <div className="card-header name">{product.name}</div> */}
        <div className="details-body">
        {shouldRedirect(redirect)}
            <div className="black-4 text-uppercase">
              {/* <Link to={`/product/${product._id}`}> */}
                {product.name}
              {/* </Link> */}
            </div>
            <p className="details-lead">
              {/* <Link to={`/product/${product._id}`}> */}
                {product.description}
              {/* </Link> */}
              <br /><br />
                ${product.price}
            </p>
              <br /><br/>
              {showStock(product.quantity)}
              <br /><br/>

              {showViewButton(showViewProductButton)}
              {showAddToCart(showAddToCartButton)}
              {showRemoveButton(showRemoveProductButton)}
              {showCartUpdateOptions(cartUpdate)}
              <br /><br />
              <hr />
              <div className="in-category">
                In: {product.category && product.category.name}
              </div>
              <div className="in-category mb-2">
                Uploaded {moment(product.createdAt).fromNow()}
              </div>


        </div>
      </div>
    </div>
  );
};

export default ProductDetails;