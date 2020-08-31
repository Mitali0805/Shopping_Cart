import React from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Dashboard from './user/UserDashboard';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import UpdateProduct from './admin/UpdataProduct'
import Store from './core/store';
import Product from './core/Product';
import Cart from './core/Cart';
import ManageProducts from './admin/ManageProducts';


function Routes(){
    return(
           <Router>
                <Switch>
                  <Route path = "/" exact component= { Home }/> 
                  <Route path = "/store" exact component={ Store } />
                  <Route path= "/signin" exact component={ Signin }/>
                  <Route path = "/signup" exact component={ Signup } />
                  <PrivateRoute path ="/user/dashboard"            
                      exact 
                      component={ Dashboard } />   
                  <AdminRoute path ="/admin/dashboard"
                      exact
                      component = { AdminDashboard } />
                   <AdminRoute path ="/create/category"
                      exact
                      component = { AddCategory } />   
                   <AdminRoute path ="/create/product"
                      exact
                      component = { AddProduct } />  
                    <Route path = "/product/:productId" exact component={ Product } />
                   
                   {/*  */}
                    <Route path ="/cart"            
                      exact 
                      component={ Cart } />

                    <AdminRoute path ="/admin/products"
                      exact
                      component = { ManageProducts } />

                    <AdminRoute path ="/admin/product/update/:productId"
                      exact
                      component = { UpdateProduct } />     


                </Switch>
           </Router>          
    )
}

export default Routes;