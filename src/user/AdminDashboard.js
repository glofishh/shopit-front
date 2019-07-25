import React from 'react';
import Layout from '../core/Layout';
import { signout, isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';


const AdminDashboard = () => {

  const {user: {_id, name, email, role}} = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className="card">
        <h1 className="card-header">My Links</h1>
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
            manage orders
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
      <div className="card-dashboard mb-2">
        <h1 className="card-header">Account Information</h1>
        <ul className="list-group">
          <li className="list-group-item">
            <h5 className="text-uppercase">Name:</h5> {name}
          </li>
          <li className="list-group-item">
            <h5 className="text-uppercase">Email:</h5> {email}
          </li>
          <li className="list-group-item">
            <h5 className="text-uppercase">Role:</h5> {role === 1 ? 'admin' : 'user'}
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
      <div className="container-create">
          <h2 className="mb-4 text-uppercase">{`welcome back, ${name}!`}<hr /></h2>
            <div className="row">
              <div className="col-3">
                {adminLinks()}
              <hr />
              <br />
                <h2 className="text-uppercase">
                  <Link to={`/profile/${_id}`}>update profile</Link>
                </h2>
              <br />
              <hr />
              <br />
                <h2 className="text-uppercase">
                  <Link onClick={() =>
                          signout(() => {
                            "/signin";
                          })
                        }>switch accounts</Link>
                </h2>

                
              <br />
              <hr />
              <br />
              </div>

              
                <div className="col-9">
                  {adminInfo()}
                </div>
            </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;