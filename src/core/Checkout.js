import React, { useState, useEffect } from "react";
import { 
  getProducts,
  getBraintreeClientToken,
  processPayment,
  createOrder
} from "./apiCore";
import Card from "./Card";
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import { emptyCart } from "./cartHelpers";


const Checkout = ({ products }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: ''
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then(data => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, [])

  const handleAddress = event => {
    setData({ ...data, address: event.target.value });
  };

  const getTotal = () => {
    return products.reduce((currentVal, nextVal) => {
      return currentVal + nextVal.count * nextVal.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-add text-uppercase">
          sign in to complete checkout
        </button>
      </Link>
    );
  };

  let deliveryAddress = data.address;

  const buy = () => {
    setData({ loading: true });
    //send the nonce to your server
    //nonce = data.instance.requestPaymentMethod()
    let nonce;
    let getNonce = data.instance.requestPaymentMethod()
      .then(data => {
        //console.log(data);
        nonce = data.nonce;
        //once you have nonce (card type and number), send nonce
        //as 'paymentMethodNonce' along with total to be charged
        //console.log(
        //    "send nonce and total to process: ",
        //      nonce,
        //      getTotal(products)
        // );
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products)
        };

          processPayment(userId, token, paymentData)
            .then(response => {
              console.log(response);
              //empty cart
              //create order
              
              const createOrderData = {
                products: products,
                transaction_id: response.transaction.id,
                amount: response.transaction.amount,
                address: deliveryAddress
              };

              createOrder(userId, token, createOrderData)
                .then(response => {
                  emptyCart(() => {
                    console.log('payment success and cart emptied');
                    setData({
                      loading: false,
                      success: true
                    });
                });
              })
              .catch(error => {
                console.log(error);
                setData({ loading: false });
              });
          })
          .catch(error => {
            console.log(error);
            setData({ loading: false });
          });
      })
      .catch(error => {
        //console.log('dropin error: ', error);
        setData({ ...data, error: error.message });
      });
  };

  const showDropIn = () => (
  
      <div onBlur={() => setData({ ...data, error: '' })}>
        {data.clientToken !== null && products.length > 0 ? (
          <div>
            <div className="form-group mb-3">
              <label className="black-5 text-uppercase">Shipping Address:</label>
              <textarea
                onChange={handleAddress}
                className="form-control border rounded-0"
                value={data.address}
                placeholder="Enter your shipping address"
              />
            </div>
          <div className="payment-module">
            <DropIn
              options={{
                authorization: data.clientToken,
                paypal: {
                  flow: 'vault'
                }
              }}
              onInstance={instance => (data.instance = instance)}
            />
            <button onClick={buy} className="btn btn-purchase text-uppercase">
              Complete Purchase
            </button>
          </div>

          </div>
        ) : null}
      </div>
  );

  const showError = error => (
    <div
      className="alert alert-danger border rounded-0"
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = success => (
    <div
      className="text-loading"
      style={{ display: success ? '' : 'none' }}
    >
      Your payment was successful. Thanks for your order!
    </div>
  );

  const showLoading = loading => loading && 
    <h2 className="text-lading">loading...</h2>

  return (
    <div>
      <h2>ESTIMATED TOTAL: ${getTotal()}</h2>
      <br/><br />
      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;