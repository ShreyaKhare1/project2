import React from "react";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios, { all } from "axios";
const Orders = () => {
  const[allOrders,setAllOrders]=useState([]);
 useEffect(() => {
  axios
    .get("https://project2-frjx.onrender.com/allOrders", {
      withCredentials: true,
    })
    .then((res) => {
      console.log(res.data);
      setAllOrders(res.data);
    })
    .catch((err) => {
      console.log(err.response?.status);
      console.log(err.response?.data);
    });
}, []);
  return (
    <div className="orders">
      { allOrders.length===0?
      <div className="no-orders">
        <p>You haven't placed any orders today</p>

        <Link to={"/"} className="btn">
          Get started
        </Link>
      </div> :
       <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Stock</th>
              <th>Mode</th>
              
              <th>Qty</th>
              <th>Price</th>
              
            </tr>
          </thead>

          <tbody>
            {allOrders.map((order, index) => {
              

              return (
                <tr key={index}>
                  <td>{order._id}</td>
                  <td>{order.name}</td>
                  <td>{order.mode}</td>
                  
                  <td>{order.qty}</td>
                  <td>{order.price.toFixed(2)}</td>
                  
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      }
    </div>
  );
};

export default Orders;
