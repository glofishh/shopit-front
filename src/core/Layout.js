import React from 'react';
import Menu from './Menu';
import '../styles.css';

const Layout = ({ title = 'Title', description = 'Description', className, children }) => (
  <div className="template">
    {/* <div className="jumbotron">
      <h2>{title}</h2>
      <p className="lead">{description}</p>
    </div> */}
      <Menu />
    <div className={className}>{children}</div>
  </div>
);


export default Layout;


