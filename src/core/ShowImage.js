import React, { useState, useEffect } from "react";
import { API } from '../config';
import { Link, Redirect } from 'react-router-dom';


const ShowImage = ({ item, url }) => {
  const [favorite, setFavorite] = useState(false);

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
        style={{ maxHeight: "100%", maxWidth: "100%" }}
      />
      <div className="top-right">
        <Link to="/user/favorites"><i class="far fa-heart" onClick={shouldRedirect}></i></Link>
      </div>
    </div>
  )
};

export default ShowImage;