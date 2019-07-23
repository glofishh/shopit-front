import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';


const Card = ({ 
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);


  // const showViewButton = showViewProductButton => {
  //   return (
  //     showViewProductButton && (
  //       <Link to={`/product/${product._id}`} className="mr-2">
  //         <button className="btn btn-outline-primary mt-2 mb-2">
  //           view product
  //         </button>
  //       </Link>
  //     )
  //   );
  // };

  // const addToCart = () => {
  //   addItem(product, () => {
  //     setRedirect(true);
  //   });
  // };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  // const showAddToCart = showAddToCartButton => {
  //   return (
  //     showAddToCartButton && (
  //       <button
  //         onClick={addToCart}
  //         className="btn btn-outline-warning mt-2 mb-2"
  //       >
  //         add to cart
  //       </button>
  //     )
  //   );
  // };

  // const showRemoveButton = showRemoveProductButton => {
  //   return (
  //     showRemoveProductButton && (
  //       <button
  //         onClick={() => removeItem(product._id)}
  //         className="btn btn-outline-danger mt-2 mb-2"
  //       >
  //           remove item
  //       </button>
  //     )
  //   );
  // };

  // const showStock = quantity => {
  //   return quantity > 0 ? (
  //     <span className="badge badge-primary badge-pill">in stock</span>
  //   ) : (
  //     <span className="badge badge-primary badge-pill">currently out of stock</span>
  //   );
  // };

  // const handleChange = productId => event => {
  //   setCount(event.target.value < 1 ? 1 : event.target.value);
  //   if (event.target.value >= 1) {
  //     updateItem(productId, event.target.value)
  //   }
  // }

  // const showCartUpdateOptions = cartUpdate => {
  //   return (
  //     cartUpdate && (
  //       <div>
  //         <div className="input-group mb-3">
  //           <div className="input-group-prepend">
  //             <span className="input-group-text">adjust quantity</span>
  //           </div>
  //           <input
  //             type="number"
  //             className="form-control"
  //             value={count}
  //             onChange={handleChange(product._id)}
  //           />
  //         </div>
  //       </div>
  //     )
  //   );  
  // };

  return (
    <div className="card-group">
      <div className="card">
        {/* <div className="card-header name">{product.name}</div> */}
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
              
              {/* <div className="black-9">
                in: {product.category && product.category.name}
              </div>
              <div className="black-8 mb-2">
                uploaded {moment(product.createdAt).fromNow()}
              </div>

              {showStock(product.quantity)}
              <br /> */}

              {/* {showViewButton(showViewProductButton)}
              {showAddToCart(showAddToCartButton)}
              {showRemoveButton(showRemoveProductButton)}
              {showCartUpdateOptions(cartUpdate)} */}


        </div>
      </div>
    </div>
  );
};

export default Card;