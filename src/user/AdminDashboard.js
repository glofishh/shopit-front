import React from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';


const AdminDashboard = () => {

  const {user: {_id, name, email, role}} = isAuthenticated();
  const adminLinks = () => {
    return (
      <div className="card">
        <h2 className="text-uppercase">Admin Links</h2>
        <ul className="list-group">

          <li className="list-group-item black-5 text-uppercase">
            <Link to="/create/category">
              create new category
            </Link>
          </li>

          <li className="list-group-item black-5 text-uppercase">
          <Link to="/create/product">
            upload new product
          </Link>
          </li>

          <li className="list-group-item black-5 text-uppercase">
          <Link to="/admin/orders">
            view orders
          </Link>
          </li>

          <li className="list-group-item black-5 text-uppercase">
          <Link to="/admin/products">
            manage products
          </Link>
          </li>

        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card-dashboard mb-5">
        <h2 className="text-uppercase">Admin Info</h2>
        <ul className="list-group">
          <li className="list-group-item border rounded-0">
            <div className="black-5 text-uppercase">Name:</div> {name}
          </li>
          <li className="list-group-item border rounded-0">
            <div className="black-5 text-uppercase">Email:</div> {email}
          </li>
          <li className="list-group-item border rounded-0">
            <div className="black-5 text-uppercase">Role:</div> {role === 1 ? 'admin' : 'user'}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="admin dashboard"
      description={`welcome back, ${name}!`}
      className="container"
    >

      <div className="container-cart">
      <h2 className="mb-4">YOUR DASHBOARD<hr /></h2>
        <div className="row">
          <div className="col-3">
            {adminLinks()}
          <hr />
          <br />
            <h2 className="text-uppercase">update profile</h2>
          <br />
          <hr />
          <br />
          <h2 className="text-uppercase">switch accounts</h2>
          <br />
          <hr />
          <br />
          </div>

          
            <div className="col-4 ml-5">
              {adminInfo()}
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;