import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index'
import { NavLink } from 'react-router-dom';
import {getPurchaseHistory} from './apiUser'

function Dashboard(){

    const [history , setHistory] = useState([])

    const {user:{_id,name,email,role}} = isAuthenticated();
    const token = isAuthenticated().token;

    const init = (userId, token) => {
        getPurchaseHistory(userId,token).then(data =>{
            if(data.error) {
                console.log(data.error);
            } else {
               setHistory(data)  
            }
        })
    }

    useEffect(()=>{
        init(_id, token)
    },[])

    const userLinks = () =>{
        return (
            <div className="card mb-5 mt-5">
                <h4 className="card-header bg-secondary">User</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        {/* <NavLink to="/profile/update">My Profile</NavLink> */}
                        <NavLink to="/user/dashboard" activeStyle={{textDecoration:'none', color:'navy'}}>My Profile</NavLink>
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

      const purchaseHistory = history => {
        return (
            <div className="card mb-5">
                <h3 className="card-header bg-secondary">My Orders</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => {
                            return (
                                <div>
                                    <hr />
                                    <h6>Order ID: {h._id} </h6>
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <h6>Product name: {p.name}</h6>
                                                <h6>
                                                    Product price: ₹{p.price}
                                                </h6>
                                                <h6>
                                                    Purchased date:{" "}
                                                    {moment(
                                                        p.createdAt
                                                    ).fromNow()}
                                                </h6>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </div>
        );
    };


    return(
       <Layout className="container">
         <div className ="row">
             <div className="col-3 offset-1">
               {userLinks()}  
             </div>

             <div className="col-7">
                {userInfo()}  
                {purchaseHistory(history)}  
             </div>
         </div>
      </Layout>
    )
}

export default Dashboard;