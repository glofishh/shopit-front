import React from 'react';
import Menu from './Menu';
import '../styles.css';

const Layout = ({ className, children }) => (
  <div className="template">
      <Menu />
    <div className={className}>{children}</div>
  </div>
);


export default Layout;


