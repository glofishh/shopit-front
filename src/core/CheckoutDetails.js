import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';


const CheckoutDetails = ({ 
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
        <Link to={`/product/${product._id}`} className="">
          <button className="btn btn-outline-primary text-uppercase">
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
    return cartUpdate && <div>
      <div className="input-group mr-3">
        <div className="input-group-prepend">
          <span className="input-group-text bg-transparent border-right-0 border rounded-0 text-uppercase">update</span>
        </div>
        <input type="number" className="form-control py-2 border rounded-0" value={count} onChange={handleChange(product._id)}/>
      </div>
    </div>;
  };

  return (
    <div className="details-group">
      <div className="details">
        {/* <div className="card-header name">{product.name}</div> */}
        <div className="details-body">
            <div className="black-5 text-uppercase">
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
              {/* <br /><br />

              <div className="black-8 mb-2">
                uploaded {moment(product.createdAt).fromNow()}
              </div>

              {showStock(product.quantity)}
              <br /> */}

              <div className="checkout-buttons-container">
                {showCartUpdateOptions(cartUpdate)}
                {/* {showViewButton(showViewProductButton)} */}
                {showAddToCart(showAddToCartButton)}
                {showRemoveButton(showRemoveProductButton)}
              </div>
              <br />
              <hr />


        </div>
      </div>
    </div>
  );
};

export default CheckoutDetails;