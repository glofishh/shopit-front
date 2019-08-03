import React, { useState, useEffect } from "react";
import { API } from '../config';
import { Link, Redirect } from 'react-router-dom';


const ShowImage = ({ item, url }, props) => {
  const [redirect, setRedirect] = useState(false);

  return (
    <div className="product-img-thumb">

      <img
        src={`${API}/${url}/photo/${item._id}`}
        alt={item.name}
        className="mb-3"
        style={{ maxHeight: "180px"}}
      />
    </div>
  )
};

export default ShowImage;