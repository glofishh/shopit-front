import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import moment from 'moment';
import { addItem, updateItem } from './cartHelpers';
import { getFavoritesList, addFavorite } from '../user/apiUser';
import { isAuthenticated } from '../auth';


const ProductDetails = ({ 
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false
}) => {
  const { user, token } = isAuthenticated();
  const [redirectToCart, setRedirectToCart] = useState(false);
  const [redirectToFavorites, setRedirectToFavorites] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [count, setCount] = useState(product.count);



  const init = (userId, token) => {
    getFavoritesList(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log('ITEM WE ARE ON ' + product._id)
        console.log('USER ID ' + user._id)
        console.log('FETCHED DATA FROM GETFAVORITE ' + JSON.stringify(data))
        for (var i = 0; i < data.length; i++) {
          console.log('inside for loop.......')
          console.log(data[i])
          if (data[i]._id === product._id) {
              console.log('is favorite!')
              setFavorite(true);
              return;
            }
            console.log('is not favorite!')
            setFavorite(false);
          }
          setIconDisplay(data);
        }
      }
    )
  };

  useEffect(() => {
    init(user._id, token);
  }, [product._id])


  const setIconDisplay = favorite => {
    if (favorite) {
      console.log('THIS SHOULD BE A FULL HEART')
      return (
        <Link to="/user/favorites">
          <i className="fas fa-heart"></i>
        </Link>
      )
    }
    return (
      <Link to="/user/favorites">
        <i className="far fa-heart" onClick={() => makeFavorite(product)}></i>
      </Link>
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
    addFavorite(user._id, token, product)
      .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          setFavorite(true);
          setRedirectToFavorites(true);
        }
    });
  };

  const shouldRedirectToCart = redirectToCart => {
    if (redirectToCart && addToCart) {
      return <Redirect to="/cart" />;
    }
  };

  const shouldRedirectToFavorites = redirectToFavorites => {
    if (redirectToFavorites && makeFavorite) {
      return <Redirect to="/user/favorites" />
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
            add to loves
          </button>
        )
      );
    }
    return (
      <button
      className="btn btn-added text-uppercase"
    >
      added to favorites
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
        {/* <div className="card-header name">{product.name}</div> */}
        <div className="details-body">
          {shouldRedirectToCart(redirectToCart)}
          {shouldRedirectToFavorites(redirectToFavorites)}
            <div className="black-4 text-uppercase">
              {/* <Link to={`/product/${product._id}`}> */}
                {product.name} {setIconDisplay(favorite)}
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
              {showAddToFavorites(showAddToFavorites)}
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

// import React, { useState, useEffect } from "react";
// import { Link, Redirect } from "react-router-dom";
// import moment from 'moment';
// import { addItem, updateItem } from './cartHelpers';
// import { addFavorite, getFavoritesList } from '../user/apiUser';
// import { isAuthenticated } from '../auth';


// const ProductDetails = ({ 
//   product,
//   showViewProductButton = true,
//   showAddToCartButton = true,
//   cartUpdate = false,
//   showRemoveProductButton = false
// }) => {
//   const { user, token } = isAuthenticated();
//   const [redirectToCart, setRedirectToCart] = useState(false);
//   const [redirectToFavorites, setRedirectToFavorites] = useState(false);
//   const [favorite, setFavorite] = useState(false);
//   const [count, setCount] = useState(product.count);



//   const init = (userId, token) => {
//     getFavoritesList(userId, token).then(data => {
//       if (data.error) {
//         console.log(data.error);
//       } else {
//         console.log('ITEM WE ARE ON ' + product._id)
//         console.log('USER ID ' + user._id)
//         console.log('FETCHED DATA FROM GETFAVORITE ' + JSON.stringify(data))
//         for (var i = 0; i < data.length; i++) {
//           console.log('inside for loop.......')
//           console.log(data[i])
//           if (data[i]._id === product._id) {
//               console.log('is favorite!')
//               setFavorite(true);
//               return;
//             }
//             console.log('is not favorite!')
//             setFavorite(false);
//           }
//           // setIconDisplay(data);
//         }
//       }
//     )
//   };

//   useEffect(() => {
//     init(user._id, token);
//   }, [product._id])

//   const setIconDisplay = favorite => {
//     if (favorite) {
//       console.log('THIS SHOULD BE A FULL HEART')
//       return (
//         <Link to="/user/favorites">
//           <i className="fas fa-heart"></i>
//         </Link>
//       )
//     }
//     return (
//       <Link to="/user/favorites">
//         <i className="far fa-heart" onClick={() => makeFavorite(product)}></i>
//       </Link>
//     )
//   }

//   // const setIconDisplay = favorites => {
//   //   console.log('inside setIconDisplay')
//   //   console.log(favorites)
//   //   for (var i = 0; i < favorites; i++) {
//   //     console.log('inside for loop')
//   //     if (item._id === favorites[i]._id || favorite) {
//   //       return <Link to="/user/favorites">
//   //       <i className="fas fa-heart"></i>
//   //       </Link>
//   //     }
//   //     return <Link to="/user/favorites">
//   //     <i className="far fa-heart" onClick={() => makeFavorite(item)}></i>
//   //     </Link>
//   //   }
//   // }


//   const showViewButton = showViewProductButton => {
//     return (
//       showViewProductButton && (
//         <Link to={`/product/${product._id}`} className="mr-2">
//           <button className="btn btn-outline-primary mt-2 mb-2">
//             view product
//           </button>
//         </Link>
//       )
//     );
//   };

//   const heart = (favorite) => {
//     if (favorite) {
//       console.log('THIS SHOULD BE A FULL HEART')
//     } else {
//       console.log('THIS IS NOT A FAVORITED ITEM')
//     }
//   }


//   const makeFavorite = product => {
//     addFavorite(user._id, token, product)
//       .then(data => {
//         if (data.error) {
//           console.log(data.error);
//         } else {
//           console.log(`added ${product.name} to favorites`)
//           // setFavorite(true);
//         }
//     });
//   }

//   const addToCart = () => {
//     addItem(product, () => {
//       setRedirectToCart(true);
//     });
//   };

//   const shouldRedirectToFavorites = redirectToFavorites => {
//     if (redirectToFavorites && favorite) {
//       return <Redirect to="/user/favorites" />
//     }
//   };


//   const showAddToFavorites = showAddToFavoritesButton => {
//     if (favorite) {
//       return (
//         showAddToFavoritesButton && (
//           <button
//               onClick={shouldRedirectToCart}
//               className="btn btn-purchase text-uppercase"
//             >
//               already in favorites
//             </button>
//         )
//       )
//     } else {
//       return (
//         showAddToFavoritesButton && (
//           <button
//             onClick={makeFavorite}
//             className="btn btn-add text-uppercase"
//           >
//             add to favorites
//           </button>
//         )
//       )
//     }
//   };

//   const shouldRedirectToCart = redirectToCart => {
//     if (redirectToCart && addToCart) {
//       return <Redirect to="/cart" />;
//     }
//   };



//   const showAddToCart = showAddToCartButton => {
//     return (
//       showAddToCartButton && (
//         <button
//           onClick={addToCart}
//           className="btn btn-add text-uppercase mb-3"
//         >
//           add to cart
//         </button>
//       )
//     );
//   };


//   const showStock = quantity => {
//     return quantity > 0 ? (
//       <span className="badge badge-primary badge-pill">in stock</span>
//     ) : (
//       <span className="badge badge-primary badge-pill">currently out of stock</span>
//     );
//   };

//   const handleChange = productId => event => {
//     setCount(event.target.value < 1 ? 1 : event.target.value);
//     if (event.target.value >= 1) {
//       updateItem(productId, event.target.value)
//     }
//   }

//   const showCartUpdateOptions = cartUpdate => {
//     return cartUpdate && <div>
//       <div className="input-group mb-3">
//         <div className="input-group-prepend">
//           <span className="input-group-text">adjust quantity</span>
//         </div>
//         <input type="number" className="form-control" value={count} onChange={handleChange(product._id)}/>
//       </div>
//     </div>;
//   };

//   return (
//     <div className="details-group">
//       <div className="details">
//         {/* <div className="card-header name">{product.name}</div> */}
//         <div className="details-body">
//         {shouldRedirectToCart(redirectToCart)}
//         {shouldRedirectToFavorites(redirectToFavorites)}
//             <div className="black-4 text-uppercase">
//               {setIconDisplay(favorite)}
//               {/* <Link to={`/product/${product._id}`}> */}
//                 {product.name}
//               {/* </Link> */}
//             </div>
//             <p className="details-lead">
//               {/* <Link to={`/product/${product._id}`}> */}
//                 {product.description}
//               {/* </Link> */}
//               <br /><br />
//                 ${product.price}
//             </p>
//               <br /><br/>
//               {showStock(product.quantity)}
//               <br /><br/>

//               {showViewButton(showViewProductButton)}
//               {showAddToCart(showAddToCartButton)}
//               {showAddToFavorites(showAddToFavorites)}
//               {showCartUpdateOptions(cartUpdate)}
//               <br /><br />
//               <hr />
//               <div className="in-category">
//                 In: {product.category && product.category.name}
//               </div>
//               <div className="in-category mb-2">
//                 Uploaded {moment(product.createdAt).fromNow()}
//               </div>
//               <button
//             onClick={makeFavorite}
//             className="btn btn-add text-uppercase"
//           >
//             add to favorites
//           </button>


//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;