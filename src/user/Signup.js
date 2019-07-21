import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  });

  const { name, email, password, error, success } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };


  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: false});
    signup({ name: name, email: email, password: password })
    .then(data => {
      if(data.error) {
        setValues({...values, error: data.error, success: false})
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          success: true
        })
      }
    })
  };


  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">name</label>
        <input
          onChange={handleChange('name')}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">email</label>
        <input
          onChange={handleChange('email')}
          type="email"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">password</label>
        <input
          onChange={handleChange('password')}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">submit</button>

    </form>
  );
  
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSucess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? '' : 'none' }}
    >
      New account has been created! <Link to ="/signin">Sign in</Link> to continue.
    </div>
  );

  return (
    <Layout
      title="Signup"
      description="Sign up for Shopit E-commerce App"
      className="container col-md-8 offset-md-2"
    >
      {showSucess()}
      {showError()}
      {signUpForm()}
    </Layout>
  );
};

export default Signup;