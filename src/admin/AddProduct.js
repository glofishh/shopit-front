import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createProduct, getCategories } from './apiAdmin';

const AddProduct = () => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: ''
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData
  } = values;

  //load categories and set form data
  const init = () => {
    getCategories().then(data =>{
      if (data.error) {
        setValues({...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData()
        });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = name => event => {
    const value =
      name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });

    createProduct(user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          photo: '',
          price: '',
          quantity: '',
          loading: false,
          createdProduct: data.name
        });
      }
    });
  };

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>post photo</h4>
        <div className="form-group">
          <label className="btn btn-secondary">
            <input
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image/*"
            />
          </label>
        </div>

        <div className="form-group">
          <label className="text-muted">name</label>
          <input
            onChange={handleChange("name")}
            type="text"
            className="form-control"
            value={name}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">description</label>
          <input
            onChange={handleChange("description")}
            className="form-control"
            value={description}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">price</label>
          <input
            onChange={handleChange("price")}
            type="number"
            className="form-control"
            value={price}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">category</label>
          <select
            onChange={handleChange("category")}
            className="form-control"
          >
            <option>please select</option>
            {categories && categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="text-muted">shipping</label>
          <select
            onChange={handleChange("shipping")}
            className="form-control"
          >
            <option>please select</option>
            <option value="0">no</option>
            <option value="1">yes</option>
          </select>
        </div>

        <div className="form-group">
          <label className="text-muted">quantity</label>
          <input
            onChange={handleChange("quantity")}
            type="number"
            className="form-control"
            value={quantity}
          />
        </div>

        <button className="btn btn-outline-primary">upload product</button>
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

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdProduct ? '' : 'none'}}
    >
      <h2>{`${createdProduct}`} has been successfully uploaded!</h2>
    </div>
  );

  const showLoading = () => 
    loading && (
      <div className="alert alert-success">
        <h2>loading...</h2>
      </div>
    );
  
    const goBack = () => (
      <div className="mt-5">
        <Link to="/admin/dashboard" className="text-warning">
          go back to dashboard
        </Link>
      </div>
    );

  return (
    <Layout
      title="add a new product"
      description={`welcome back, ${user.name}! upload a new product`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  )
}

export default AddProduct;