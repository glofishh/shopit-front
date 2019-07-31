import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
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
    <div>
        <span
          className="text-uppercase "
          style={{
            padding: '20px',
            width: '580px'
          }}
        >
          {key}: 
        </span>
        <span
          style={{
            "font-family": 'ProximaNova-Regular'
          }}
        >
          {value}
        </span>
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
      <div className="black-5 mb-2 text-uppercase" >Status: {o.status}</div>
      <select
        className="form-control border rounded-0"
        onChange={e => handleStatusChange(e, o._id)}
        style={{width: '580px'}}>
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

  const goBack = () => (
    <div className="black-5 text-uppercase mt-5">
      <Link to="/admin/dashboard">
        go back to dashboard
      </Link>
    </div>
  );

  return (
    <Layout
      title='orders'
      description={`welcome, ${user.name}! manage orders here`}
    >
    {showOrdersLength()}
<div className="container-create">
      <div class="table-wrapper">
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-8 text-uppercase"><h2>manage orders</h2></div>
                    <div class="col-sm-4">
                    </div>
                </div>
            </div>
            <table class="table table-bordered">
                <thead>
                  <tr>
                    <th><div className="black-5 text-uppercase">{orders.length} orders total</div></th>
                    </tr>
                </thead>
                <tbody>

                  <div className="form-group black-5 mt-3">
                  {orders.map((o, oIndex) => {
                    return (
                      <div className="black-5 ml-3" key={oIndex}>
                        <span 
                          key={oIndex}
                          className="text-uppercase"
                        >
                          order ID: {o._id}
                        </span>

                  <ul className="list-group">
                  <li className="list-group-item">
                    {showStatus(o)}
                  </li>

                  <li className="list-group-item py-0">
                  <div
                        className="mb-4"
                        style={{
                          padding: '20px',
                          border: '1px solid gray',
                          width: '580px'
                        }}
                      >

                    <div className="black-5 text-uppercase">
                      <div className="input-group-prepend">
                        <div className="">amount: </div>
                      </div>
                      <input
                        type="text"
                        value={o.amount}
                        className="form-control border rounded-0"
                        readOnly
                      />
                    </div>

                    <div className="black-5 text-uppercase">
                      <div className="input-group-prepend">
                        <div className="">order name: </div>
                      </div>
                      <input
                        type="text"
                        value={o.user.name}
                        className="form-control border rounded-0"
                        readOnly
                      />
                    </div>

                    <div className="black-5 text-uppercase">
                      <div className="input-group-prepend">
                        <div className="">order date: </div>
                      </div>
                      <input
                        type="text"
                        value={moment(o.createdAt).fromNow()}
                        className="form-control border rounded-0"
                        readOnly
                      />
                    </div>

                    <div className="black-5 text-uppercase">
                      <div className="input-group-prepend">
                        <div className="">shipped to: </div>
                      </div>
                      <input
                        type="text"
                        value={o.address}
                        className="form-control border rounded-0"
                        readOnly
                      />
                    </div>

                    <div className="black-5 text-uppercase">
                      <div className="input-group-prepend">
                        <div className="">total units in order: </div>
                      </div>
                      <input
                        type="text"
                        value={o.products.length}
                        className="form-control border rounded-0"
                        readOnly
                      />
                    </div>
                  </div>
                </li>
                </ul>

                  <td>
                    {o.products.map((p, pIndex) => (
                      <div
                        className="mb-4"
                        key={pIndex}
                      >
                        {showInput('Item name', p.name)}
                        {showInput('Unit price', `$${p.price}`)}
                        {showInput('Quantity', p.count)}
                        {showInput('Item ID', p._id)}
                      </div>
                    ))}
                  </td>
                  </div>
                  );
                })}
                </div>
                
                </tbody>
            </table>
            {goBack()}<br />
          </div>
        </div>


    </Layout>
  );
};

export default Orders;