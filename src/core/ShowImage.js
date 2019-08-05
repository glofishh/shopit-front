import React, { useState, useEffect } from "react";
import { API } from '../config';
import { Link } from 'react-router-dom';
import { getFavoritesList } from '../user/apiUser';
import { isAuthenticated } from '../auth';


const ShowImage = ({ item, url }) => {
  const [favorite, setFavorite] = useState(false);

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const showFavorites = () => {
    return isAuthenticated() ? (
      <div>{setIconDisplay(favorite)}</div>
    ) : (
      <Link to="/signin">
        <i className="far fa-heart"></i>
      </Link>
    );
  };

  const init = (userId, token) => {
    getFavoritesList(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        for (var i = 0; i < data.length; i++) {
          if (data[i]._id === item._id) {
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
  }, [item._id])

  const setIconDisplay = favorite => {
    if (favorite) {
      return (
        <Link to="/user/favorites">
          <i className="fas fa-heart"></i>
        </Link>
      )
    }
    return (
      <Link to="/user/favorites">
        <i className="far fa-heart"></i>
      </Link>
    )
  }

  return (
    <div className="product-img">

      <img
        src={`${API}/${url}/photo/${item._id}`}
        alt={item.name}
        className="mb-3"
        style={{ maxHeight: "100%", maxWidth: "100%"}}
      />
      <div className="top-right">
          {showFavorites()}
      </div>
    </div>
  )
};

export default ShowImage;