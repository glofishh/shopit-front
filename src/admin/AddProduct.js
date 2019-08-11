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
    <form className="mb-3 black-5 text-uppercase" onSubmit={clickSubmit}>
      <h4>item photo</h4>
        <div className="form-group">
          <label className="btn btn-outline-primary">
            <input
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image/*"
            />
          </label>
        </div>

        <div className="form-group">
          <label className="black-5 text-uppercase">item name</label>
          <input
            onChange={handleChange("name")}
            type="text"
            className="form-control border rounded-0"
            value={name}
          />
        </div>

        <div className="form-group">
          <label className="black-5 text-uppercase">item description</label>
          <input
            onChange={handleChange("description")}
            className="form-control border rounded-0"
            value={description}
          />
        </div>

        <div className="form-group">
          <label className="black-5 text-uppercase">item price</label>
          <input
            onChange={handleChange("price")}
            type="number"
            className="form-control border rounded-0"
            value={price}
          />
        </div>

        <div className="form-group">
          <label className="black-5 text-uppercase">item category</label>
          <select
            onChange={handleChange("category")}
            className="form-control border rounded-0"
          >
            <option>Select Category</option>
            {categories && categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group rounded-0">
          <label className="black-5 text-uppercase">shipping</label>
          <select
            onChange={handleChange("shipping")}
            className="form-control border rounded-0"
          >
            <option>Select Shipping Option</option>
            <option value="0">Pick-up only</option>
            <option value="1">Can be shipped</option>
          </select>
        </div>

        <div className="form-group">
          <label className="black-5 text-uppercase">item quantity</label>
          <input
            onChange={handleChange("quantity")}
            type="number"
            className="form-control border rounded-0"
            value={quantity}
          />
        </div>
        <br />< br />
        <button className="btn btn-add text-uppercase">upload item</button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? '' : 'none' }}
    >
      <i class="fas fa-exclamation-triangle"></i> {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="text-success"
      style={{ display: createdProduct ? '' : 'none'}}
    >
      <h2>Item has been successfully uploaded.</h2>
    </div>
  );

  const showLoading = () => 
    loading && (
      <div className="text-success" style={{color: 'black'}}>
        <h2>loading...</h2>
      </div>
    );
  
    const goBack = () => (
      <div className="mt-5">
        <Link to="/admin/dashboard" className="black-5 text-uppercase mt-5">
          go back to dashboard
        </Link>
      </div>
    );

  return (
    <Layout
      title="add a new product"
      className="container-create"
    >
      <div class="table-wrapper">
          <div class="table-title">
              <div class="row">
                  <div class="col-sm-8 text-uppercase"><h2>add new item</h2>
                  </div>
              </div>
          </div>
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
          {goBack()}
      </div>
    </Layout>
  )
}

export default AddProduct;