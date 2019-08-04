import React, { useState, useEffect } from "react";
import { API } from '../config';
import { Link, Redirect } from 'react-router-dom';
import { getFavoritesList, addFavorite, removeFavorite } from '../user/apiUser';
import { isAuthenticated } from '../auth';


const ShowImage = ({ item, url }) => {
  const [redirect, setRedirect] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const { user, token } = isAuthenticated();

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

  const makeFavorite = () => {
    addFavorite(user._id, token, item)
      .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          setFavorite(true);
          // setRedirectToFavorites(true);
        }
    });
  };

  const undoFavorite = () => {
    removeFavorite(item._id, token, user._id)
      .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          setFavorite(false);
          // setRedirectToFavorites(true);
        }
    });
  };

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

  useEffect(() => {
    init(user._id, token);
  }, [item._id])

  useEffect(() => {
    setIconDisplay(favorite);
  }, [])

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
      <div className="top-right">
        {/* <Link to="/user/favorites"> */}
          {setIconDisplay(favorite)}
        {/* </Link> */}
      </div>
    </div>
  )
};

export default ShowImage;