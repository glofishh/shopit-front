import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';
import { itemTotal } from './cartHelpers';
import SearchBar from './SearchBar';


const isActive = (history, path) => {
  if(history.location.pathname === path) {
    return {color: '#ffffff'};
  } else {
    return {color: '#000000'};
  }
};

const Menu = ({ history }) => (
    <nav className="navbar navbar-expand-md align-items-lg-start fixed-top">
      <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        <ul className="nav nav-tabs border-bottom-0">
          <ul className="navbar-nav mr-auto nav nav-tabs border-bottom-0">
            <li className="nav-item text-uppercase font-weight-bold">
              <SearchBar />
            </li>

          </ul>
      </ul>
    </div>

        <div className="mx-auto order-0">
        <ul className="navbar-nav ml-auto">
          <div className="menu-header text-uppercase">
            <li className="nav-item-main text-uppercase">
              <Link
                className="nav-link"
                style={isActive(history, "/")}
                to="/"
              >
                home
              </Link>
            </li>
          </div>
          </ul>
        </div>
    

    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
      <ul className="navbar-nav ml-auto">
            <li className="nav-item text-uppercase font-weight-bold">
              <Link
                className="nav-link"
                style={isActive(history, "/shop")}
                to="/shop"
              >
                shop
              </Link>
            </li>
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li className="nav-item text-uppercase font-weight-bold">
              <Link
                className="nav-link"
                style={isActive(history, "/user/dashboard")}
                to="/user/dashboard"
              >
                dashboard
              </Link>
            </li>
          )}
          
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className="nav-item text-uppercase font-weight-bold">
              <Link
                className="nav-link"
                style={isActive(history, "/admin/dashboard")}
                to="/admin/dashboard"
              >
                dashboard
              </Link>
            </li>
          )}

          {!isAuthenticated() && (
            <Fragment>
              <li className="nav-item text-uppercase font-weight-bold">
                <Link
                  className="nav-link"
                  style={isActive(history, "/signin")}
                  to="/signin"
                >
                  sign in
                </Link>
              </li>

              <li className="nav-item text-uppercase font-weight-bold">
                <Link
                  className="nav-link"
                  style={isActive(history, "/signup")}
                  to="/signup"
                >
                  signup
                </Link>
              </li>
            </Fragment>
          )}

          {isAuthenticated() && (
            <li className="nav-item text-uppercase font-weight-bold">
              <span
                className="nav-link"
                style={{ cursor: "pointer", color: "#b4c6ca" }}
                onClick={() =>
                  signout(() => {
                    history.push("/");
                  })
                }
              >
                hi, {isAuthenticated().user.name}
              </span>
            </li>
          )}

          <li className="nav-item text-uppercase font-weight-bold">
              <Link
                className="nav-link"
                style={isActive(history, "/dashboard")}
                to="/dashboard"
              >
                <i className="fas fa-heart"></i>
              </Link>
          </li>

          <li className="nav-item text-uppercase font-weight-bold">
              <Link
                className="nav-link"
                style={isActive(history, "/cart")}
                to="/cart"
              >
                cart{' '}

                  {/* <small className="cart-badge"> */}
                    {itemTotal()}
                  {/* </small> */}

              </Link>
          </li>

        </ul>
    </div>
  </nav>

);

export default withRouter(Menu);