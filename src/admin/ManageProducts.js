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
      <div class="table-wrapper">
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-8 text-uppercase"><h2>manage products</h2></div>
                    <div class="col-sm-4">
                    </div>
                </div>
            </div>
           

            <table class="table table-bordered">
                <thead>
                  <tr>
                    <th><div className="black-5 text-uppercase">{products.length} products total</div></th>
                    </tr>
                </thead>
                <tbody>
                
                  <tr>
                  <td className="list-group">
                    {products.map((p, i) => (
                      <div className="list-group-item">
                        <td 
                          key={i}
                          className="black-5 text-uppercase"
                        >
                          {i+1}. {p.name}
                        </td>
                        <td>
                            <a class="edit" title="Edit" data-toggle="tooltip" onClick={`/admin/product/update/${p._id}`}>
                                <i class="far fa-edit"></i>
                            </a>
                            <a class="delete" title="Delete" data-toggle="tooltip" onClick={() => destroy(p._id)}>
                                <i class="far fa-trash-alt"></i>
                            </a>
                            </td>
                        </div>
                      ))}
                  </td>
                  </tr>
                </tbody>
            </table>
            {goBack()}<br />
          </div>
        </div>
    </Layout>

  );
};

export default ManageProducts;