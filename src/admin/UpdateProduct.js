import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { getProduct, getCategories, updateProduct } from './apiAdmin';

const UpdateProduct = ({ match }) => {
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
  const init = productId => {
    getProduct(productId).then(data =>{
      if (data.error) {
        setValues({...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          shipping: data.shipping,
          quantity: data.quantity,
          formData: new FormData()
        });
        //load categories
        initCategories();
      }
    });
  };

  //load categories and set form data
  const initCategories = () => {
    getCategories().then(data =>{
      if (data.error) {
        setValues({...values, error: data.error });
      } else {
        setValues({
          categories: data,
          formData: new FormData()
        });
      }
    });
  };

  useEffect(() => {
    init(match.params.productId);
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

    updateProduct(match.params.productId, user._id, token, formData).then(data => {
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
          error: false,
          redirectToProfile: true,
          createdProduct: data.name
        });
      }
    });
  };

  const newPostForm = () => (
    <form className="mb-3 black-5 text-uppercase" onSubmit={clickSubmit}>
      <h4>upload new photo</h4>
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
          <label className="black-5 text-uppercase">new item name</label>
          <input
            onChange={handleChange("name")}
            type="text"
            className="form-control border rounded-0"
            value={name}
          />
        </div>

        <div className="form-group">
          <label className="black-5 text-uppercase">new item description</label>
          <input
            onChange={handleChange("description")}
            className="form-control border rounded-0"
            value={description}
          />
        </div>

        <div className="form-group">
          <label className="black-5 text-uppercase">new item price</label>
          <input
            onChange={handleChange("price")}
            type="number"
            className="form-control border rounded-0"
            value={price}
          />
        </div>

        <div className="form-group">
          <label className="black-5 text-uppercase">new item category</label>
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

        <div className="form-group border rounded-0">
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

        <button className="btn btn-add text-uppercase">update item</button>
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
      <h2>{`${createdProduct}`} has been successfully updated.</h2>
    </div>
  );

  const showLoading = () => 
    loading && (
      <div className="alert alert-success">
        <h2>loading...</h2>
      </div>
    );
  
    const redirectUser = () => {
      if (redirectToProfile) {
        if (!error) {
          return <Redirect to="/admin/products" />;
        }
      }
    };

    const goBackToDashboard = () => (
      <div>
        <Link to="/admin/dashboard" className="black-5 text-uppercase mt-5">
          go back to dashboard
        </Link>
      </div>
    );

    const goBackToProducts = () => (
      <div className="mt-5">
        <Link to="/admin/products" className="black-5 text-uppercase mt-5">
          go back to manage products
        </Link>
      </div>
    );

  return (
    <Layout
      title="add a new product"
      description={`welcome back, ${user.name}! upload a new product`}
      className="container-create"
    >
      <div class="table-wrapper">
          <div class="table-title">
              <div class="row">
                  <div class="col-sm-8 text-uppercase"><h2>update item</h2>
                  </div>
              </div>
          </div>
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
          {redirectUser()}
          {goBackToProducts()}
          {goBackToDashboard()}
        </div>
    </Layout>
  );
};

export default UpdateProduct;