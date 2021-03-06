import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import ShowImageThumb from '../core/ShowImageThumb';
import { addItem } from '../core/cartHelpers';
import { getFavoritesList, removeFavorite } from './apiUser';


const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const {user: {_id}} = isAuthenticated();
  const token = isAuthenticated().token;


  const init = (userId, token) => {
    getFavoritesList(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setFavorites(data);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  const callRemoveFunction = item => {
    console.log('removing favorite...')
    removeFavorite(item, token, _id).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log('successfully removed item!')
        getFavoritesList(_id, token).then(data => {
          if (data.error) {
            console.log(data.error);
          } else {
            setFavorites(data);
          }
        });
      }
    })
  }

  const addToCart = item => {
    addItem(item, () => {
      callRemoveFunction(item);
      setRedirect(true);
    });
  };

  const shouldRedirectToCart = redirect => {
    if (redirect && addToCart) {
      return <Redirect to="/cart" />;
    }
  };

  const goBack = () => (
    <div className="black-5 text-uppercase mt-3">
      <a href="javascript: history.go(-1)">
        go back
      </a>
    </div>
  );

  const favoritesList = favorites => {
    return (
          <div className="card mb-2">
            <ul className="list-group">
              <li className="list-group-item" >
                <h2>{`${favorites.length}`} {`${favorites.length === 1 ? `ITEM` : `ITEMS`}`} SAVED</h2>
                {favorites.map((f, i) => {
                  return (
                    <div>
                      <hr />
                      <div className="row m-0">
                        <div className="col-3">
                          <Link to={`/product/${f._id}`}>
                            <ShowImageThumb item={f} url="product" />
                          </Link>
                        </div>
                        <div className="row">
                          <div key={i} style={{width: "460px"}}>
                            <div className="black-6 text-uppercase">
                              <Link to={`/product/${f._id}`}>
                                {f.name}</Link><br />
                                <div className="black-6 text-uppercase">${f.price}</div>
                            </div>
                            <Link to={`/product/${f._id}`}>
                              {f.description.substring(0,70)}...</Link><br /><br />
                            <br /><br />
                            <div className="row mt-3">
                              <div className="col-12">
                                <button
                                  className="col-5 mr-2 btn btn-add text-uppercase"
                                  onClick={() => callRemoveFunction(f)}
                                >
                                  remove
                                </button>
                                <button
                                  className="col-6 btn btn-add text-uppercase"
                                  onClick={() => addToCart(f)}
                                >
                                  add to cart
                                </button>
                              </div>
                            </div>
                          </div>
                      <div/>
                      </div>
                      <br />
                      </div>
                    </div>
                  );
                })}
              </li>
            </ul>
          
      </div>
  
    );
  };

  return (
    <Layout
      className="container-create"
      >
      <div class="table-wrapper">
        {shouldRedirectToCart(redirect)}
          <div class="table-title">
              <div class="row">
                  <div class="col-sm-8 text-uppercase"><h2>my favorites</h2>
                  </div>
              </div>
          </div>
          {favoritesList(favorites)}
          {goBack()}
      </div>
    </Layout>
  );
};

export default Favorites;