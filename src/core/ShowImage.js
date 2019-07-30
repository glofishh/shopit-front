import React from 'react';
import { API } from '../config';
import { Link } from 'react-router-dom';
import { addToFavorites } from '../user/apiUser';



const ShowImage = ({ item, url }) => (
  <div className="product-img">
    <img
      src={`${API}/${url}/photo/${item._id}`}
      alt={item.name}
      className="mb-3"
      style={{ maxHeight: "100%", maxWidth: "100%" }}
    />
    <div className="top-right">
      <Link to="/user/favorites"><i class="far fa-heart"></i></Link>
    </div>
  </div>
);

export default ShowImage;