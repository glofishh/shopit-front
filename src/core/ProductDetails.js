import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import moment from 'moment';
import { addItem, updateItem } from './cartHelpers';
import { getFavoritesList, addFavorite, removeFavorite } from '../user/apiUser';
import { isAuthenticated } from '../auth';


const ProductDetails = ({ 
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showAddToFavoritesButton = true
}) => {

  const [redirectToCart, setRedirectToCart] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [count, setCount] = useState(product.count);

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const showFavorites = () => {
    return isAuthenticated() ? (
      <div>{showAddToFavorites(showAddToFavoritesButton)}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-add text-uppercase">
          sign in to see <i className="fas fa-heart" style={{fontSize: "15px"}}></i>'s
        </button>
      </Link>
    );
  };

  const init = (userId, token) => {
    getFavoritesList(userId, token).then(data => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        for (var i = 0; i < data.length; i++) {
          console.log(data[i])
          if (data[i]._id === product._id) {
              setFavorite(true);
              return;
            }
            setFavorite(false);
          }
          setIconDisplay(data);
        }
      }
    )
  };

  useEffect(() => {
    init(userId, token);
  }, [product._id])


  const setIconDisplay = favorite => {
    if (favorite) {
      return (
        // <Link to="/user/favorites">
          <i className="fas fa-heart" onClick={() => undoFavorite()}></i>
        // </Link>
      )
    }
    return (
      // <Link to="/user/favorites">
        <i className="far fa-heart" onClick={() => makeFavorite()}></i>
      // </Link>
    )
  }

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
      setRedirectToCart(true);
    });
  };

  const makeFavorite = () => {
    addFavorite(userId, token, product)
      .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          setFavorite(true);
        }
    });
  };

  const undoFavorite = () => {
    removeFavorite(product, token, userId)
      .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          setFavorite(false);
        }
    });
  };

  const shouldRedirectToCart = redirectToCart => {
    if (redirectToCart && addToCart) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className="btn btn-add text-uppercase mb-3"
        >
          add to cart
        </button>
      )
    );
  };

  const showAddToFavorites = showAddToFavoritesButton => {
    if (!favorite) {
      return (
        showAddToFavoritesButton && (
          <button
            onClick={makeFavorite}
            className="btn btn-add text-uppercase"
          >
            add to favorites
          </button>
        )
      );
    }
    return (
      <button
      className="btn btn-added text-uppercase"
      onClick={undoFavorite}
    >
      remove from favorites
    </button>
    )
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
        <div className="details-body">
          {shouldRedirectToCart(redirectToCart)}
            <div className="black-4 text-uppercase">
                {product.name} {setIconDisplay(favorite)}
            </div>
            <p className="details-lead">
                {product.description}
              <br /><br />
                ${product.price}
            </p>
              <br /><br/>
              {showStock(product.quantity)}
              <br /><br/>
              {showViewButton(showViewProductButton)}
              {showAddToCart(showAddToCartButton)}
              {showFavorites()}
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