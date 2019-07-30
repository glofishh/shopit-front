import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getPurchaseHistory, getFavoritesList } from './apiUser';
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
            <Link to="/user/favorites">my favorites <i class="fas fa-heart"></i></Link>
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
            <h5 className="text-uppercase">
              Name:</h5>
              {name}</li>
          <li className="list-group-item">
            <h5 className="text-uppercase">
              Email:</h5>
              {email}</li>
          <li className="list-group-item">
            <h5 className="text-uppercase">
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
              <li className="list-group-item"><h2>HISTORY</h2>
                {history.map((h, i) => {
                  return (
                    <div>
                      <hr />
                      {h.products.map((p, i) => {
                        return (
                          <div key={i}>
                            <div className="black-5 text-uppercase">
                              <u>purchased on {moment(p.createdAt).format('L')}:</u>
                            </div>
                              <div className="black-6">Item Description:</div>
                              {p.name}<br />
                              <div className="black-6">Unit Price:</div>
                              ${p.price}<br />
                          <br />
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
      title="dashboard"
      description={`welcome back, ${name}!`}
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