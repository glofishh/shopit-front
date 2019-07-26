import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import Shop from './core/Shop';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Product from './core/Product';
import Cart from './core/Cart';
import Orders from './admin/Orders';
import Profile from './user/Profile';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import Results from './core/Results';


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/shop" exact component={Shop}/>
        <Route path="/search" exact component={Results}/>
        <Route path="/signin" exact component={Signin}/>
        <Route path="/signup" exact component={Signup}/>
        <PrivateRoute path ="/user/dashboard" exact component={Dashboard} />
        <AdminRoute path ="/admin/dashboard" exact component={AdminDashboard} />
        <AddCategory path ="/create/category" exact component={AddCategory} />
        <AddProduct path ="/create/product" exact component={AddProduct} />
        <Route path="/product/:productId" exact component={Product}/>
        <Route path="/cart" exact component={Cart}/>
        <AdminRoute path ="/admin/orders" exact component={Orders} />
        <PrivateRoute path ="/profile/:userId" exact component={Profile} />
        <AdminRoute path ="/admin/products" exact component={ManageProducts} />
        <AdminRoute path ="/admin/product/update/:productId" exact component={UpdateProduct} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;