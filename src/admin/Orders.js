import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { listOrders, getStatusValues, updateOrderStatus } from './apiAdmin';
import moment from 'moment';


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h1 className="text-danger">
          total orders: {orders.length}
        </h1>
      );
    } else {
      return <h1 className="text-danger">your order history is empty: no orders to display</h1>
    }
  };

  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input
        type="text"
        value={value}
        className="form-control"
        readOnly
      />
    </div>
  );

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value)
      .then(data => {
        if (data.error) {
          console.log('status update failed');
        } else {
          loadOrders();
        }
      }
    );
  };

  const showStatus = o => (
    <div className="form-group">
      <h3 className="mark mb-4">Status: {o.status}</h3>
      <select
        className="form-control"
        onChange={e => handleStatusChange(e, o._id)}
    >
        <option>Update Status</option>
        {statusValues.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <Layout
      title='orders'
      description={`welcome, ${user.name}! manage orders here`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showOrdersLength()}

          {orders.map((o, oIndex) => {
            return (
              <div
                className="mt-3"
                key={oIndex}
                style={{ borderBottom: "1px solid gray" }}
              >
                <h2 className="mb-5">
                  <span className="bg-primary">
                    order ID: {o._id}
                  </span>
                </h2>

                <ul className="list-group mb-2">
                  <li className="list-group-item">
                    {showStatus(o)}
                  </li>
                  <li className="list-group-item">
                    amount: ${o.amount}
                  </li>
                  <li className="list-group-item">
                    order name: {o.user.name}
                  </li>
                  <li className="list-group-item">
                    order date: {" "}
                    {moment(o.createdAt).fromNow()}
                  </li>
                  <li className="list-group-item">
                    shipped to: {o.address}
                  </li>
                </ul>

                <h3 className="mt-4 mb-4 font-italic">
                  total items in order:{" "}
                  {o.products.length}
                </h3>

                {o.products.map((p, pIndex) => (
                  <div
                    className="mb-4"
                    key={pIndex}
                    style={{
                      padding: '20px',
                      border: '1px solid gray'
                    }}
                  >
                    {showInput('Product name', p.name)}
                    {showInput('Product price', p.price)}
                    {showInput('Product total', p.count)}
                    {showInput('Product ID', p._id)}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;