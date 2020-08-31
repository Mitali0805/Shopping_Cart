import React from 'react';

import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index'
import { NavLink } from 'react-router-dom';

function Dashboard(){

    const {user:{_id,name,email,role}} = isAuthenticated();

    const userLinks = () =>{
        return (
            <div className="card mb-5 mt-5">
                <h4 className="card-header bg-secondary">User</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <NavLink to="/profile/update">My Profile</NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink to="/cart">My Cart</NavLink>
                    </li>
                </ul>
            </div>
        )
    };

    const userInfo =() =>{
     return(
      <div className="card mb-5 mt-5">
        <h3 className="card-header bg-secondary">User Information</h3>
        <ul className="list-group">
            <li className="list-group-item">{name}</li>
            <li className="list-group-item">{email}</li>
            <li className="list-group-item">{role === 0 ? 'User' : 'Admin'}</li>
        </ul>
      </div>
      )};

    const purchaseHistory = () =>{
        return(
            <div className="card mb-5">
            <h3 className="card-header bg-secondary">Your Orders</h3>
            <ul className="list-group">
                <li className="list-group-item">history</li>
            </ul>
        </div>
        )
    }

    return(
       <Layout className="container">
         <div className ="row">
             <div className="col-3 offset-1">
               {userLinks()}  
             </div>

             <div className="col-7">
                {userInfo()}  
                {purchaseHistory()}  
             </div>
         </div>
      </Layout>
    )
}

export default Dashboard;