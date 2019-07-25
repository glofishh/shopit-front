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
        <label className="black-5 text-uppercase">name</label>
        <input
          type="text"
          className="form-control border rounded-0"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          style={{width: "50%"}}
        />
      </div>
      <button className="btn btn-add text-uppercase" style={{width: "50%"}}>
          create category
      </button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">{name} has been successfully created</h3>;
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
      className="container"
    >
      <div className="container-create">
      <h2 className="mb-4 text-uppercase">{`add another category`}<hr /></h2>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            {showSuccess()}
            {showError()}
            {newCategoryForm()}
            {goBack()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;