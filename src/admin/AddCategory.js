import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createCategory } from './apiAdmin';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);


  //destructure user and token from localStorage
  const { user, token } = isAuthenticated()

  const handleChange = e => {
    setError('');
    setName(e.target.value);
  };

  const clickSubmit = e => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    // make request to api to create category
    createCategory(user._id, token, { name }).then(data => {
        if (data.error) {
            setError(true);
        } else {
            setError("");
            setSuccess(true);
        }
    });
};

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="black-5 text-uppercase">new category name</label>
        <input
          type="text"
          className="form-control border rounded-0"
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </div>
      <button className="btn btn-add text-uppercase">
          create category
      </button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">Category has been successfully created</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className="text-danger"><i class="fas fa-exclamation-triangle"></i> {name} already exists</h3>;
    }
  };

  const goBack = () => (
    <div className="black-5 text-uppercase mt-5">
      <Link to="/admin/dashboard">
        go back to dashboard
      </Link>
    </div>
  );

  return (
    <Layout
      title="add a new category"
      className="container-create"
    >

      <div class="table-wrapper">
          <div class="table-title">
              <div class="row">
                  <div class="col-sm-8 text-uppercase"><h2>add category</h2>
                  </div>
              </div>
          </div>
          {showSuccess()}
          {showError()}
          {newCategoryForm()}
          {goBack()}
      </div>
    </Layout>
  );
};

export default AddCategory;