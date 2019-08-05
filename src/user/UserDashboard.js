import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getPurchaseHistory } from './apiUser';
import ShowImageThumb from '../core/ShowImageThumb';
import moment from 'moment';


const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const {user: {_id, name, email, role}} = isAuthenticated();
  const token = isAuthenticated().token;

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  const userLinks = () => {
    return (
      <div className="card">
        <h1 className="card-header">My Links</h1>
        <ul className="list-group">
          <li className="list-group-item black-5 text-uppercase">
            <Link to="/cart">my cart</Link>
          </li>
          <li className="list-group-item black-5 text-uppercase">
            <Link to="/user/favorites">my favorites <i className="fas fa-heart" style={{fontSize: "12px"}}></i></Link>
          </li>
          <li className="list-group-item black-5 text-uppercase">
          <Link to={`/profile/${_id}`}>update profile</Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className="card mb-2">
        <h1 className="card-header">Account Information</h1>
        <ul className="list-group">
          <li className="list-group-item">
            <h5 className="text-uppercase mb-0">
              Name:</h5>
              {name}</li>
          <li className="list-group-item">
            <h5 className="text-uppercase mb-0">
              Email:</h5>
              {email}</li>
          <li className="list-group-item">
            <h5 className="text-uppercase mb-0">
              Role:</h5>
              {role === 1 ? 'admin' : 'user'}</li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = history => {
    return (
          <div className="card mb-5">
            <h1 className="card-header">Past Purchases</h1>
            <ul className="list-group">
              <li className="list-group-item">
                {history.map((h, i) => {
                  return (
                    <div>
                      <h2 className="mb-0">{moment(h.createdAt).format('L')} - Order ID: {h._id}</h2>
                      <hr />
                      <div className="black-6 mb-0 text-uppercase">Order Status: {h.status}</div>
                      <div className="black-6 text-uppercase">Shipping To: {h.address}</div>
                      <div className="black-6 text-uppercase mb-4">Total: ${h.amount}</div>
                      {h.products.map((p, i) => {
                        return (
                          <div className="row m-0">
                            <div className="col-2 px-1 ">
                              <Link to={`/product/${p._id}`}>
                                <ShowImageThumb item={p} url="product" style={{height: "50px"}}/>
                              </Link>
                            </div>
                            <div className="row">
                              <div key={i}>
                              <div className="ml-2"><i>(Item {i+1} of {h.products.length})</i></div><br/>
                                <div className="black-6 text-uppercase ml-2">Item Name:</div>
                                  <div className="ml-4">{p.name}</div>
                                <div className="black-6 text-uppercase ml-2">Unit Price:</div>
                                  <div className="ml-4">${p.price}</div>
                                <div className="black-6 text-uppercase ml-2">Quantity:</div>
                                  <div className="ml-4 mb-4">{p.count}</div><br/>
                              </div>
                            </div>
                          </div>
                        );
                      })}
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
      className="container"
    >
      <div className="container-cart"> 
        <h2 className="mb-4 text-uppercase">{`welcome back, ${name}!`}<hr /></h2>
          <div className="row">
            <div className="col-3">
              {userLinks()}
            </div>
            <div className="col-9">
              {userInfo()}
              {purchaseHistory(history)}
            </div>
          </div>
      </div>
    </Layout>
  );
};

export default Dashboard;