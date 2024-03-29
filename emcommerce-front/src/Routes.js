import React, { useEffect } from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import Menu from './core/Menu';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/Userdashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Shop from './core/Shop';
import Product from './core/Product'
import Cart from './core/Cart';

const Routes = () => {




    return (
        <Router>
       
            <Switch>
                <Home path ="/" exact component ={Home} />
                 <Route path="/shop" exact component={Shop}/>
                <Route path="/signin" exact component={Signin}/>
                <Route path ="/signup" exact component ={Signup}/>
                <Route path ="/product/:productId"  component ={Product} />
                <Route path ="/cart" exact component ={Cart}/>
                
                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                <AdminRoute path="/admin/dashboard"  exact component={AdminDashboard} />
                <AdminRoute path = "/create/category" exact component = {AddCategory} />
                <AdminRoute path ="/create/product"  exact component={AddProduct} />
            </Switch>
        </Router>
    )
}


export default Routes
