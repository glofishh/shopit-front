import React from 'react';
import Menu from './Menu';
import ControlledCarousel from './ControlledCarousel';
import '../styles.css';

const LayoutHome = ({ title = 'Title', description = 'Description', className, children }) => (

  <div className="splash">
    <div className="carousel-container">
        <ControlledCarousel />
    </div>
      <Menu />
    free shipping on all orders
    <div className="homepage-container">
      <div className={className}>{children}</div>
    </div>
  </div>
);


export default LayoutHome;