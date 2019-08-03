import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';
import { addFavorite } from '../user/apiUser';
import { isAuthenticated } from '../auth';
import ShowImageThumb from './ShowImageThumb';


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


  // const showViewButton = showViewProductButton => {
  //   return (
  //     showViewProductButton && (
  //       <Link to={`/product/${product._id}`} className="">
  //         <button className="btn btn-outline-primary text-uppercase">
  //           view product
  //         </button>
  //       </Link>
  //     )
  //   );
  // };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  // const shouldRedirect = redirect => {
  //   if (redirect) {
  //     return <Redirect to="/cart" />;
  //   }
  // };

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
          onClick={() => makeFavorite(product)}
          className="btn btn-outline-primary text-uppercase ml-2"
        >
            move to favorites
        </button>
      )
    );
  };

  const makeFavorite = product => {
    addFavorite(user._id, token, product)
      .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          removeItem(product._id);
          // NEED TO MAKE ASYNC IF USING:
          //setRedirectToFavorites(true);
        }
    });
  };

  // const showStock = quantity => {
  //   return quantity > 0 ? (
  //     <span className="badge badge-primary badge-pill">in stock</span>
  //   ) : (
  //     <span className="badge badge-primary badge-pill">currently out of stock</span>
  //   );
  // };

  const handleChange = productId => event => {
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value)
    }
  }

  const showCartUpdateOptions = cartUpdate => {
    return cartUpdate && <div style={{width: "120px"}}>
      <div className="input-group mr-3">
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
        {/* <div className="card-header name">{product.name}</div> */}
        <div className="details-body">
            <div className="black-5 text-uppercase">
              <ShowImageThumb item={product} url="product" />
              {/* <Link to={`/product/${product._id}`}> */}
                {product.name}
              {/* </Link> */}
            </div>
            <div className="">
                ${product.price}
            </div>
            {/* <p className="details-lead"> */}
              <Link to={`/product/${product._id}`}>
                {product.description}
              </Link>
            {/* </p> */}
              <div className="">
                In: {product.category && product.category.name}
              </div>
              <br />

              <div className="checkout-buttons-container">
                {showCartUpdateOptions(cartUpdate)}
                {showAddToCart(showAddToCartButton)}
                {showRemoveButton(showRemoveProductButton)}
                <button
                  onClick={() => makeFavorite(product)}
                  className="btn btn-outline-primary text-uppercase ml-2"
                >
                    move to favorites
                </button>
              </div>
              <br />
              <hr />


        </div>
      </div>
    </div>
  );
};

export default CheckoutDetails;