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

        <button className="btn btn-outline-primary">update product</button>
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
      <h2>{`${createdProduct}`} has been successfully updated!</h2>
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
          {redirectUser()}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;