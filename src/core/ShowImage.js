import React, { useState, useEffect } from "react";
import { API } from '../config';
import { Link, Redirect } from 'react-router-dom';
import { getFavoritesList, addFavorite } from '../user/apiUser';
import { isAuthenticated } from '../auth';


const ShowImage = ({ item, url }, props) => {
  const [redirect, setRedirect] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { user, token } = isAuthenticated();


  useEffect(() => {
  }, []);

  const makeFavorite = () => {
    addFavorite(user._id, token, item)
      .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          // setFavorite(true);
          // setRedirectToFavorites(true);
        }
    });
  };

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
        <i className="far fa-heart" onClick={() => makeFavorite(item)}></i>
      </Link>
    )
  }

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/user/favorites" />
    }
  };

  return (
    <div className="product-img">

      <img
        src={`${API}/${url}/photo/${item._id}`}
        alt={item.name}
        className="mb-3"
        style={{ maxHeight: "100%", maxWidth: "100%"}}
      />
    </div>
  )
};

export default ShowImage;