import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';


const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, [items]);

  const showItems = items => {
    return (
      <div>
        <h2>
          you currently have {`${items.length}`} items in your cart
          <br />
          <Link to="/shop">continue shopping</Link>
        </h2>
        <hr />
        {items.map((product, i) => (
          <Card 
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
    <h2>
      your cart is currently empty.
      <br/> <Link to="/shop">continue shopping</Link>
    </h2>
  );

  return (
    <Layout
      title="shopping cart"
      description="manage your items"
      className="container-fluid"
    >

      <div className="row">
        <div className="col-6">
        {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>

        <div className="col-6">
          <h2 className="mb-4">your cart summary</h2>
          <hr />
          <Checkout products={items} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;