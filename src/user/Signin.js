import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { signin, authenticate, isAuthenticated } from '../auth';

const Signin = () => {
  const [values, setValues] = useState({
    //--USER CREDENTIALS------------------
    email: 'glerbs@theflerbs.com',
    password: 'yyyyy1',
    error: '',
    loading: false,
    redirectToReferrer: false,
  });

  //--ADMIN CREDENTIALS-------------------
  // const [values, setValues] = useState({
  //   email: 'flerbs@theglerbs.com',
  //   password: 'pass1word',
  //   error: '',
  //   loading: false,
  //   redirectToReferrer: false,
  // });

  const { email, password, error, loading, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email: email, password: password })
    .then(data => {
      if(data.error) {
        setValues({ ...values, error: data.error, loading: false })
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true
          });
        });
      }
    })
  };

  const signUpForm = () => (
    <form>
        <div className="form-group">
              <label className="black-5 text-uppercase">email</label>
              <input
                onChange={handleChange('email')}
                type="email"
                className="form-control border rounded-0"
                value={email}
              />
        </div>
        <div className="form-group">
          <label className="black-5 text-uppercase">password</label>
          <input
            onChange={handleChange('password')}
            type="password"
            className="form-control border rounded-0"
            value={password}
          />
        </div>
        <br /><br />
        <button onClick={clickSubmit} className="btn btn-add text-uppercase">submit</button>
    </form>
  );

  const showError = () => (
    <div
      className="alert border rounded-0"
      style={{ display: error ? '' : 'none' }}
    >
      <i class="fas fa-exclamation-triangle"></i> {error}
    </div>
  );

  const showLoading = () => (
    loading && (
      <div className="text-loading">
        <h2>Loading...</h2>
      </div>)
  );

  const redirectUser = () => {
    if(redirectToReferrer) {
      if(user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if(isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Layout
      className="container-create"
    >
      <div className="table-wrapper">
        {showLoading()}
        {showError()}
        {signUpForm()}
        {redirectUser()}
        </div>
    </Layout>
  );
};

export default Signin;