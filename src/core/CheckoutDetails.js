import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';
import { addFavorite } from '../user/apiUser';
import { isAuthenticated } from '../auth';


const CheckoutDetails = ({ 
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  showMoveProductButton = false
}) => {
  const [redirect, setRedirect] = useState(false);
  const [redirectToFavorites, setRedirectToFavorites] = useState(false);
  const [count, setCount] = useState(product.count);
  const { user, token } = isAuthenticated();



  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };


  const shouldRedirectToFavorites = redirectToFavorites => {
    if (redirectToFavorites) {
      return <Redirect to="/user/favorites" />;
    }
  };

  const showAddToCart = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className="btn btn-outline-primary"
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
          className="btn btn-outline-primary text-uppercase ml-2"
        >
            remove item
        </button>
      )
    );
  };

  const showMoveButton = showMoveProductButton => {
    return (
      showMoveProductButton && (
        <button
          onClick={() => moveToFavorites(product)}
          className="btn btn-outline-primary text-uppercase ml-2"
        >
            move to favorites
        </button>
      )
    );
  };

  const moveToFavorites = product => {
    addFavorite(user._id, token, product)
      .then(data => {
        if (data.error) {
          setRedirectToFavorites(true);
          console.log(data.error);
        } else {
          removeItem(product._id);
          // NEED TO MAKE ASYNC IF USING:
          //setRedirectToFavorites(true);
        }
    });
  };


  const handleChange = productId => event => {
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value)
    }
  }

  const showCartUpdateOptions = cartUpdate => {
    return cartUpdate && <div style={{width: "125px", float: "right"}}>
      <div className="input-group pt-5">
        <div className="input-group-prepend" style={{width: "50%"}}>
          <span className="input-group-text bg-transparent border-right-0 border rounded-0 text-uppercase">QTY</span>
        </div>
        <input type="number" className="form-control py-2 border rounded-0" value={count} onChange={handleChange(product._id)}/>
      </div>
    </div>;
  };

  return (
    <div className="details-group">
      {shouldRedirectToFavorites(redirectToFavorites)}
      <div className="details">
        <div className="details-body" style={{width: "400px"}}>
            <div className="black-5 text-uppercase">
              <Link to={`/product/${product._id}`}>
                {product.name}
              </Link>
            </div>
            <div className="">
                ${product.price}
            </div>
            <div>
              {showCartUpdateOptions(cartUpdate)}
            </div>
              <div className="checkout-buttons-container">
                <div className="col-12">
                  <div className="row">
                    <button
                      onClick={() => moveToFavorites(product)}
                      className="btn btn-add text-uppercase"
                      style={{width: "130px"}}
                    >
                        move to <i className="fas fa-heart" style={{fontSize: "14px"}}></i>
                    </button>
                    <button
                      onClick={() => removeItem(product._id)}
                      className="btn btn-add text-uppercase ml-2"
                      style={{width: "130px"}}
                    >
                        remove
                    </button>
                  </div>
                </div>
              </div>
              <br />
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetails;
