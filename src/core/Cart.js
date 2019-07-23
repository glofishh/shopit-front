import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import CheckoutDetails from './CheckoutDetails';
import Checkout from './Checkout';



const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, [items]);

  const showItems = items => {
    return (
      <div>
        You have {`${items.length}`} {`${items.length === 1 ? `item` : `items`}`} in your cart.
        <br/> <h4><Link to="/shop">CONTINUE SHOPPING</Link></h4>

        <hr />
        
        {items.map((product, i) => (
          <CheckoutDetails 
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
          />
        ))}
      </div>
    );
  };


  const noItemsMessage = () => (
    <div>
      Your cart is currently empty.
      <br/> <h4><Link to="/shop">CONTINUE SHOPPING</Link></h4>
    </div>
  );

  const oneItemMessage = () => (
    <div>
      You have 1 item in your bag.
      <br/> <h4><Link to="/shop">CONTINUE SHOPPING</Link></h4>
    </div>
  )

  return (
    <Layout
      title="shopping cart"
      description="manage your items"
      className="container"
    >
      <div className="container-cart">
        <h2 className="mb-4">YOUR CART<hr /></h2>
        <div className="row">
          <div className="col-6">
            {items.length > 0 ? showItems(items) : noItemsMessage()}
          </div>

          <div className="col-6">

            <Checkout products={items} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;