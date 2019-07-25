import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getProducts().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };
  
  const destroy = productId => {
    deleteProduct(productId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const goBack = () => (
    <div className="black-5 text-uppercase mt-5">
      <Link to="/admin/dashboard">
        go back to dashboard
      </Link>
    </div>
  );

  return (
    <Layout
      title="Manage Products"
      description="perform CRUD on products"
      className="container"
    >
      <div className="container-create">
      <h2 className="mb-4 text-uppercase">{`manage products in system`}<hr /></h2>
        <div className="row">
          <div className="col-12">
            <div className="text-left">
              There are {products.length} products total.
            </div>
            <br />
            <div className="col-8">
                <ul className="list-group">
                  {products.map((p, i) => (
                    <li
                      key={i}
                      className="list-group-item d-flex justify-content-space-between align-items-center"
                    >
                      <div className="black-5 text-uppercase">{i+1}. {p.name}</div>...........
                      <Link to={`/admin/product/update/${p._id}`}>
                        Edit Item <i class="far fa-edit"></i>
                      </Link>...............
                      <Link
                        onClick={() => destroy(p._id)}
                      >
                        Delete Item <i class="far fa-trash-alt"></i>
                      </Link>

                    </li>
                  ))}
                </ul>
                {goBack()}<br /><br />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;