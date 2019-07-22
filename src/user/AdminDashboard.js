import React from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';


const AdminDashboard = () => {

  const {user: {_id, name, email, role}} = isAuthenticated();
  const adminLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Admin Links</h4>
        <ul className="list-group text-uppercase">

          <li className="list-group-item">
            <Link className="nav-link" to="/create/category">
              create new category
            </Link>
          </li>

          <li className="list-group-item">
          <Link className="nav-link" to="/create/product">
            upload new product
          </Link>
          </li>

          <li className="list-group-item">
          <Link className="nav-link" to="/admin/orders">
            view orders
          </Link>
          </li>

          <li className="list-group-item">
          <Link className="nav-link" to="/admin/products">
            manage products
          </Link>
          </li>

        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Info</h3>
        <ul className="list-group">
          <li className="list-group-item">Name: {name}</li>
          <li className="list-group-item">Email: {email}</li>
          <li className="list-group-item">Role: {role === 1 ? 'admin' : 'user'}</li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="admin dashboard"
      description={`welcome back, ${name}!`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{adminLinks()}</div>
        <div className="col-9">
          {adminInfo()}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;