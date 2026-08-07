import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
function OpenAccount() {
  const navigate=useNavigate();
  return ( 
    <div className='container'>
      <div className='row text-center'>
        <h2 className='mb-4'> Open a Zerodha account</h2>
        <p className='text-muted mt-2 mb-4'>Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.</p>
        <button className='btn btn-primary m-auto mt-2' style={{width:"20%"}}  onClick={() => navigate("/signup")}>Sign up for free</button>
      </div>
    </div>
   );
}

export default OpenAccount;