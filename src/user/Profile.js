import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import { read, update, updateUser } from './apiUser';


const Profile = ({ match }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: false,
    success: false
  });

  const { token } = isAuthenticated();
  const { name, email, password, error, success } = values;

  const init = userId => {
    //console.log(userId)
    read(userId, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    })
  };

  useEffect(() => {
    init(match.params.userId);
  }, []);


  const handleChange = name => e => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const clickSubmit = e => {
    e.preventDefault();
    update(match.params.userId, token, { name, email, password })
      .then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          updateUser(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true
            });
          });
        }
    });
  };

    const redirectUser = success => {
      if (success) {
        return <Redirect to="/" />
      }
    };

    const goBack = () => (
      <div className="mt-5">
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <div className="black-5 text-uppercase">
            <Link
              to="/user/dashboard"
            >
              go back to dashboard
            </Link>
          </div>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <div className="black-5 text-uppercase">
            <Link
              to="/admin/dashboard"
            >
              go back to dashboard
            </Link>
          </div>
        )}
      </div>
    );


  const profileUpdate = (name, email, password) => (
    <form>

      <div className="form-group">
        <label className="black-5 text-uppercase">Name</label>
        <input
          type="text"
          onChange={handleChange('name')}
          className="form-control border rounded-0"
          value={name}
          style={{width: "50%"}}
        />
      </div>
      <div className="form-group">
        <label className="black-5 text-uppercase">Email</label>
        <input
          type="email"
          onChange={handleChange('email')}
          className="form-control border rounded-0"
          value={email}
          style={{width: "50%"}}
        />
      </div>
      <div className="form-group">
        <label className="black-5 text-uppercase">Password</label>
        <input
          type="password"
          onChange={handleChange('password')}
          className="form-control border rounded-0"
          value={password}
          style={{width: "50%"}}
        />
      </div>
      <br /><br />
      <button onClick={clickSubmit} className="btn btn-add text-uppercase" style={{width: "50%"}}>
        update profile
      </button>
    </form>
  );

  return (
    <Layout
      title="My Profile"
      description="Update your profile"
      className="container"
    >
  
      <h2 className="mb-4 text-uppercase">Update Profile/password</h2>
          {profileUpdate(name, email, password)}
          {redirectUser(success)}
          {goBack()}
    </Layout>
  )
};


export default Profile;